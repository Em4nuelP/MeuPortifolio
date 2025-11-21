
// types.ts

export interface Project {
  title: string;
  longDescription: string;
  image: string;
  images: string[];
  tags: string[];
  projectUrl: string;
  featured?: boolean;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface Certification {
  title: string;
  issuer: string;
}

export interface Course {
  title: string;
  issuer: string;
  year: string;
}

export interface SkillCategory {
  category: string;
  technologies: string[];
}

export interface SocialLink {
  name: 'LinkedIn' | 'Github';
  url: string;
  username: string;
}

export interface ContactInfo {
  email: string;
  socialLinks: SocialLink[];
}

export interface PersonalInfo {
  name: string;
  role: string;
  profilePic: string;
  bannerPic: string; // Adicionado para a imagem do banner
  aboutMe: string[];
  shortSummary: string;
  welcomeMessage: string; // Nova mensagem sutil
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  courses: Course[];
  skills: SkillCategory[];
}


export type Section = 'inicio' | 'sobre' | 'projetos' | 'contato';

// Props para o componente Sidebar
export interface SidebarProps {
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentSection: Section;
  setCurrentSection: (section: Section) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
