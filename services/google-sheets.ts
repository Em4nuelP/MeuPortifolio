
import { PortfolioData, Project, Education, Certification, Course, SkillCategory, PersonalInfo, ContactInfo } from '../types';
import { portfolioData as fallbackData } from '../portfolio-data';

// =================================================================================
// CONFIGURAÇÃO DO GOOGLE SHEETS
// =================================================================================
// ID da planilha fornecido pelo usuário
const SPREADSHEET_ID = '1MGSbSUxIOldQ-nl4eUw0cRirPoL3_b7md8VNjhMRd6Y'; 

// =================================================================================
// HELPERS
// =================================================================================

// Converte links do Google Drive para links diretos de imagem
const convertDriveUrl = (url: string) => {
  if (!url) return '';
  
  // Tenta extrair o ID do arquivo
  // Padrão comum: https://drive.google.com/file/d/ID_DO_ARQUIVO/view
  const matchId = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  
  if (matchId && matchId[1]) {
    const id = matchId[1];
    // Usa lh3.googleusercontent.com para renderizar a imagem diretamente
    return `https://lh3.googleusercontent.com/d/${id}`;
  }
  
  return url;
};

const fetchSheet = async (sheetName: string) => {
  if (!SPREADSHEET_ID) return null;
  
  try {
    // Adicionado &headers=1 para garantir que a API trate a primeira linha como cabeçalho
    const response = await fetch(`https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&headers=1&sheet=${sheetName}`);
    
    if (!response.ok) {
        console.warn(`Falha ao buscar a aba ${sheetName}: ${response.statusText}`);
        return null;
    }
    
    const text = await response.text();
    const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\);/);
    
    if (jsonMatch && jsonMatch[1]) {
      const data = JSON.parse(jsonMatch[1]);
      return parseTable(data.table);
    }
    return null;
  } catch (error) {
    console.warn(`Erro ao buscar aba ${sheetName}:`, error);
    return null;
  }
};

const parseTable = (table: any) => {
  if (!table || !table.cols || !table.rows) return [];
  
  // Mapeia os índices das colunas pelos labels (headers)
  // Normalização agressiva: remove espaços, :, -, _ e converte para minúsculo
  const headers = table.cols.map((col: any) => {
      const label = col?.label || '';
      return label.toLowerCase().replace(/[\s:_-]/g, '').trim();
  });

  // Log para debug das colunas encontradas
  console.log("Colunas normalizadas:", headers);
  
  return table.rows.map((row: any) => {
    const obj: any = {};
    row.c.forEach((cell: any, i: number) => {
      if (headers[i]) {
        // Se a célula for null, usa string vazia
        obj[headers[i]] = cell?.v ?? '';
      }
    });
    return obj;
  });
};

const splitArray = (str: string | undefined, separator = ',') => {
  if (!str) return [];
  return str.toString().split(separator).map(s => s.trim()).filter(Boolean);
};

const splitNewLines = (str: string | undefined) => {
    if (!str) return [];
    return str.toString().split(/\r?\n|\|\|/).map(s => s.trim()).filter(Boolean);
}

// =================================================================================
// FETCH DATA
// =================================================================================

export const fetchPortfolioData = async (): Promise<PortfolioData | null> => {
  if (!SPREADSHEET_ID) {
      console.log("ID da planilha não configurado. Usando dados locais.");
      return null;
  }

  try {
    // Busca todas as abas necessárias.
    const [meRaw, projectsRaw, sobMRaw, skillsRaw] = await Promise.all([
      fetchSheet('Me'),
      fetchSheet('Proje'), 
      fetchSheet('SobM'),
      fetchSheet('Tec')
    ]);

    // --- PROCESSAMENTO DA ABA 'Me' ---
    const meRows = meRaw || [];
    if (meRows.length === 0) {
        console.warn("Dados de perfil não encontrados na aba 'Me' ou planilha vazia.");
    }

    // Assume que a linha 0 contém as informações principais (nome, role, imagens)
    const p = meRows[0] || {};

    // Dados básicos
    const personalInfo: PersonalInfo = {
      name: p.name || fallbackData.personalInfo.name,
      role: p.role || fallbackData.personalInfo.role,
      profilePic: convertDriveUrl(p.profilepic) || fallbackData.personalInfo.profilePic,
      bannerPic: convertDriveUrl(p.bannerpic) || fallbackData.personalInfo.bannerPic,
      shortSummary: p.shortsummary || fallbackData.personalInfo.shortSummary,
      welcomeMessage: p.welcomemessage || fallbackData.personalInfo.welcomeMessage,
      aboutMe: splitNewLines(p.aboutme).length > 0 ? splitNewLines(p.aboutme) : fallbackData.personalInfo.aboutMe
    };

    // Processamento de Contatos
    // Estratégia Híbrida:
    // 1. Tenta pegar das colunas da primeira linha (ex: linkedinurl)
    // 2. Varre TODAS as linhas procurando colunas 'contatotipo' e 'contato'
    
    let linkedinUrl = p.linkedinurl || p.linkedin;
    let githubUrl = p.githuburl || p.github;
    let email = p.email;

    // Varredura por linhas (formato lista na planilha)
    meRows.forEach((row: any) => {
        const type = (row.contatotipo || row.tipo || '').toLowerCase();
        // Adicionado fallback para row.contto caso seja um erro de digitação na planilha, e row.link/row.url
        const value = row.contato || row.contto || row.link || row.url || '';

        if (value) {
            if (type.includes('linkedin')) linkedinUrl = value;
            else if (type.includes('github')) githubUrl = value;
            else if (type.includes('mail') || type.includes('e-mail')) email = value;
        }
    });

    const contactInfo: ContactInfo = {
      email: email || fallbackData.contactInfo.email,
      socialLinks: [
        { 
            name: 'LinkedIn', 
            url: linkedinUrl || '#', 
            username: 'LinkedIn' 
        },
        { 
            name: 'Github', 
            url: githubUrl || '#', 
            username: 'Github' 
        }
      ].filter(l => l.url && l.url !== '#') as any
    };

    // --- PROCESSAMENTO DA ABA 'Proje' ---
    const projects: Project[] = (projectsRaw || []).map((row: any) => {
      // Processa imagens das colunas images1, images2, images3
      const multiImages = [row.images1, row.images2, row.images3]
        .filter(Boolean)
        .map(url => convertDriveUrl(url));

      // Processa imagem principal
      const mainImage = convertDriveUrl(row.image);
      
      // Se não houver images1/2/3, tenta usar a coluna 'images' antiga ou apenas a mainImage
      let finalImages = multiImages;
      if (finalImages.length === 0) {
          if (row.images) {
              finalImages = splitArray(row.images).map(url => convertDriveUrl(url));
          } else if (mainImage) {
              finalImages = [mainImage];
          }
      }

      // Garante que tenha pelo menos uma imagem se a mainImage existir
      if (finalImages.length === 0 && mainImage) {
          finalImages = [mainImage];
      }

      return {
        title: row.title || 'Projeto Sem Título',
        longDescription: row.longdescription || '',
        image: mainImage || finalImages[0] || '',
        images: finalImages,
        tags: splitArray(row.tags),
        projectUrl: row.projecturl || '#',
        featured: row.featured !== undefined && row.featured !== '' 
            ? String(row.featured).toLowerCase() === 'true' 
            : true
      };
    });

    // --- PROCESSAMENTO DA ABA 'SobM' ---
    const aboutRows = sobMRaw || [];

    // Filtra Formação (Education)
    const education: Education[] = aboutRows
      .filter((row: any) => row.type && (row.type.toLowerCase().includes('formacao') || row.type.toLowerCase().includes('formação')))
      .map((row: any) => ({
        degree: row.title,
        institution: row.issuer,
        period: row.year ? row.year.toString() : ''
      }));

    // Filtra Certificações
    const certifications: Certification[] = aboutRows
      .filter((row: any) => row.type && (row.type.toLowerCase().includes('certificaco') || row.type.toLowerCase().includes('certificações')))
      .map((row: any) => ({
        title: row.title,
        issuer: row.issuer
      }));

    // Filtra Cursos
    const courses: Course[] = aboutRows
      .filter((row: any) => row.type && (row.type.toLowerCase().includes('curso')))
      .map((row: any) => ({
        title: row.title,
        issuer: row.issuer,
        year: row.year ? row.year.toString() : ''
      }));


    // --- PROCESSAMENTO DA ABA 'Tec' ---
    const skills: SkillCategory[] = (skillsRaw || []).map((row: any) => ({
      category: row.category,
      technologies: splitArray(row.technologies)
    }));

    // Se não retornou projetos da planilha, usa o fallback
    const finalProjects = projects.length > 0 ? projects : fallbackData.projects;
    
    return {
      personalInfo,
      contactInfo,
      projects: finalProjects,
      education: education.length > 0 ? education : fallbackData.education,
      certifications: certifications.length > 0 ? certifications : fallbackData.certifications,
      courses: courses.length > 0 ? courses : fallbackData.courses,
      skills: skills.length > 0 ? skills : fallbackData.skills
    };

  } catch (error) {
    console.error("Erro geral ao processar dados da planilha:", error);
    return null;
  }
};
