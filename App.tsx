
import React, { useState, useEffect, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetail } from './components/ProjectDetail';
import { HomeSection } from './components/HomeSection';
import type { Project, Section, PortfolioData, Education, Certification, Course, SkillCategory, ContactInfo } from './types';
import { Github, Linkedin, Mail, ArrowUpRight, Loader2 } from 'lucide-react';
import { portfolioData as fallbackData } from './portfolio-data';
import { fetchPortfolioData } from './services/google-sheets';

// Helper component for Timeline Item to ensure consistency
const TimelineItem: React.FC<{
  title: string;
  subtitle: string;
  date?: string;
}> = ({ title, subtitle, date }) => (
  <div className="relative pl-6 border-l-2 border-flat-border dark:border-flat-border-dark pb-6 last:pb-0 last:border-transparent">
    <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-flat-bg dark:bg-flat-bg-dark border-4 border-flat-primary dark:border-flat-primary-dark"></span>
    <div>
      <h3 className="font-bold text-base text-flat-text-primary dark:text-flat-text-primary-dark leading-tight mb-1">{title}</h3>
      <p className="text-flat-text-secondary dark:text-flat-text-secondary-dark text-sm font-medium">{subtitle}</p>
      {date && (
        <p className="text-xs text-flat-text-secondary/70 dark:text-flat-text-secondary-dark/70 mt-1 bg-flat-border/30 dark:bg-flat-border-dark/30 inline-block px-2 py-0.5 rounded-[10px]">
          {date}
        </p>
      )}
    </div>
  </div>
);

const AboutSection: React.FC<{
  aboutMe: string[];
  education: Education[];
  certifications: Certification[];
  courses: Course[];
  skills: SkillCategory[];
}> = ({ aboutMe, education, certifications, courses, skills }) => (
  <div className="space-y-12">
    {/* Intro */}
    <div className="space-y-4">
        <h1 className="text-3xl font-bold text-flat-primary dark:text-flat-primary-dark">Sobre Mim</h1>
        <div className="prose dark:prose-invert max-w-none space-y-4">
            {aboutMe.map((paragraph, index) => (
            <p key={index} className="text-flat-text-secondary dark:text-flat-text-secondary-dark text-base leading-relaxed">
                {paragraph}
            </p>
            ))}
        </div>
    </div>

    {/* Education & Certifications Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Academic Background */}
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-flat-primary dark:text-flat-primary-dark flex items-center gap-3">
                <span className="w-1.5 h-6 bg-flat-primary dark:bg-flat-primary-dark rounded-full"></span>
                Formação Acadêmica
            </h2>
            <div className="pl-2">
                {education.map((item, index) => (
                    <TimelineItem 
                        key={index}
                        title={item.degree}
                        subtitle={item.institution}
                        date={item.period}
                    />
                ))}
            </div>
        </div>

        {/* Certifications */}
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-flat-primary dark:text-flat-primary-dark flex items-center gap-3">
                 <span className="w-1.5 h-6 bg-flat-primary dark:bg-flat-primary-dark rounded-full"></span>
                Certificações
            </h2>
            <div className="pl-2">
                {certifications.map((cert, index) => (
                    <TimelineItem 
                        key={index}
                        title={cert.title}
                        subtitle={cert.issuer}
                    />
                ))}
            </div>
        </div>
    </div>
    
    {/* Relevant Courses - Same layout structure as requested */}
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-flat-primary dark:text-flat-primary-dark flex items-center gap-3">
        <span className="w-1.5 h-6 bg-flat-primary dark:bg-flat-primary-dark rounded-full"></span>
        Cursos Relevantes
      </h2>
      <div className="pl-2 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
        {courses.map((course, index) => (
             <TimelineItem 
                key={index}
                title={course.title}
                subtitle={course.issuer}
                date={course.year}
            />
        ))}
      </div>
    </div>

    {/* Technologies - Highlighted & Static */}
    <div className="pt-8 border-t border-flat-border dark:border-flat-border-dark">
      <h2 className="text-xl font-bold text-flat-primary dark:text-flat-primary-dark mb-6">Tecnologias e Ferramentas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skillCategory, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="text-base font-semibold text-flat-text-primary dark:text-flat-text-primary-dark">{skillCategory.category}</h3>
            <div className="flex flex-wrap gap-2">
              {skillCategory.technologies.map((tech, tIdx) => (
                <span key={tIdx} className="bg-flat-primary/20 dark:bg-flat-primary-dark/20 text-flat-primary dark:text-flat-primary-dark border border-flat-primary/10 dark:border-flat-primary-dark/20 text-sm font-medium px-3 py-1.5 rounded-[10px] cursor-default">
                    {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);


const ProjectsSection: React.FC<{ 
  projects: Project[];
  onProjectClick: (project: Project) => void 
}> = ({ projects, onProjectClick }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    projects.forEach(project => {
      project.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!selectedTag) {
      return projects;
    }
    return projects.filter(project => project.tags.includes(selectedTag));
  }, [selectedTag, projects]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-flat-primary dark:text-flat-primary-dark mb-2">Meus Projetos</h1>
        <p className="text-flat-text-secondary dark:text-flat-text-secondary-dark text-base">
            Explore meu portfólio de soluções de dados e dashboards.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 pt-2 pb-6 border-b border-flat-border dark:border-flat-border-dark">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-4 py-2 rounded-[10px] text-sm font-medium transition-all duration-300 ${
            !selectedTag
              ? 'bg-flat-primary text-white shadow-md dark:bg-flat-primary-dark dark:text-flat-bg-dark'
              : 'bg-white text-flat-text-secondary border border-flat-border hover:border-flat-primary hover:text-flat-primary dark:bg-flat-surface-dark dark:text-flat-text-secondary-dark dark:border-flat-border-dark dark:hover:text-flat-primary-dark'
          }`}
        >
          Todas
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-[10px] text-sm font-medium transition-all duration-300 ${
              selectedTag === tag
                ? 'bg-flat-primary text-white shadow-md dark:bg-flat-primary-dark dark:text-flat-bg-dark'
                : 'bg-white text-flat-text-secondary border border-flat-border hover:border-flat-primary hover:text-flat-primary dark:bg-flat-surface-dark dark:text-flat-text-secondary-dark dark:border-flat-border-dark dark:hover:text-flat-primary-dark'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={index} project={project} onCardClick={() => onProjectClick(project)} />
        ))}
      </div>
    </div>
  );
};

const ContactSection: React.FC<{contact: ContactInfo}> = ({ contact }) => {
  // Verifica se o email é na verdade uma URL
  const isEmailUrl = contact.email.toLowerCase().startsWith('http');

  return (
    <div className="space-y-8">
      <div>
          <h1 className="text-3xl font-bold text-flat-primary dark:text-flat-primary-dark mb-2">Contato</h1>
          <p className="text-flat-text-secondary dark:text-flat-text-secondary-dark text-base">
          Vamos conversar sobre como posso ajudar no seu próximo projeto.
          </p>
      </div>
      
      {/* Clean Vertical Stack - No buttons, no borders */}
      <div className="flex flex-col gap-6 pt-4 max-w-2xl">
        
        {/* Email Row */}
        <a 
          href={isEmailUrl ? contact.email : `mailto:${contact.email}`}
          target={isEmailUrl ? "_blank" : undefined}
          rel={isEmailUrl ? "noopener noreferrer" : undefined}
          className="flex items-start group"
        >
          <div className="mt-0.5 text-flat-text-secondary dark:text-flat-text-secondary-dark group-hover:text-flat-primary dark:group-hover:text-flat-primary-dark transition-colors">
              <Mail className="w-5 h-5" />
          </div>
          <div className="ml-4">
              <p className="text-xs font-bold text-flat-text-secondary/70 dark:text-flat-text-secondary-dark/70 uppercase tracking-wide mb-0.5">
                {isEmailUrl ? 'Link de Contato' : 'Email'}
              </p>
              <div className="flex items-center gap-2">
                  <span className="text-base font-medium text-flat-text-primary dark:text-flat-text-primary-dark group-hover:text-flat-primary dark:group-hover:text-flat-primary-dark transition-colors break-all line-clamp-1">
                      {isEmailUrl ? 'E-mail' : contact.email}
                  </span>
                  {isEmailUrl && <ArrowUpRight className="w-4 h-4 text-flat-text-secondary/50" />}
              </div>
          </div>
        </a>
        
        {/* Social Links Rows */}
        {contact.socialLinks.map(social => {
            const Icon = social.name === 'LinkedIn' ? Linkedin : Github;
            return (
            <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-start group">
                <div className="mt-0.5 text-flat-text-secondary dark:text-flat-text-secondary-dark group-hover:text-flat-primary dark:group-hover:text-flat-primary-dark transition-colors">
                    <Icon className="w-5 h-5" />
                </div>
                <div className="ml-4">
                    <p className="text-xs font-bold text-flat-text-secondary/70 dark:text-flat-text-secondary-dark/70 uppercase tracking-wide mb-0.5">{social.name}</p>
                    <div className="flex items-center gap-2">
                          <span className="text-base font-medium text-flat-text-primary dark:text-flat-text-primary-dark group-hover:text-flat-primary dark:group-hover:text-flat-primary-dark transition-colors">
                              {social.username}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-flat-text-secondary/50" />
                    </div>
                </div>
            </a>
            )
        })}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<Section>('inicio');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  
  // Data states
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(fallbackData);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme === 'dark' || storedTheme === 'light') {
        return storedTheme;
      }
    }
    return 'light';
  });

  // Fetch Data from Sheets on Mount
  useEffect(() => {
    const initData = async () => {
      setIsDataLoading(true);
      const sheetData = await fetchPortfolioData();
      if (sheetData) {
        setPortfolioData(sheetData);
      }
      // Minimo tempo de loading para evitar flash muito rápido se o cache estiver ativo
      // Mas aqui vamos deixar fluido.
      setIsDataLoading(false);
    };
    initData();
  }, []);
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentSection, selectedProject]);

  const handleSectionChange = (section: Section) => {
    setSelectedProject(null); 
    setCurrentSection(section);
  };
  
  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setCurrentSection('projetos');
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
  };

  const { personalInfo, projects, education, certifications, courses, skills, contactInfo } = portfolioData;

  const renderContent = () => {
    if (selectedProject) {
      return <ProjectDetail project={selectedProject} onBack={handleBackToProjects} onImageZoom={setZoomedImage} />;
    }

    switch (currentSection) {
      case 'inicio':
        return <HomeSection 
                  personalInfo={personalInfo} 
                  projects={projects.filter(p => p.featured)} 
                  skills={skills} 
                  onNavigate={handleSectionChange}
                  onProjectSelect={handleProjectSelect}
                />;
      case 'projetos':
        return <ProjectsSection projects={projects} onProjectClick={handleProjectSelect} />;
      case 'contato':
        return <ContactSection contact={contactInfo} />;
      case 'sobre':
      default:
        return <AboutSection aboutMe={personalInfo.aboutMe} education={education} certifications={certifications} courses={courses} skills={skills} />;
    }
  };

  return (
    <div className="min-h-screen bg-flat-bg dark:bg-flat-bg-dark transition-colors duration-300">
      {/* Loading Overlay */}
      {isDataLoading && (
        <div className="fixed inset-0 z-50 bg-flat-bg dark:bg-flat-bg-dark flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
             <Loader2 className="w-8 h-8 text-flat-primary dark:text-flat-primary-dark animate-spin" />
             <p className="text-flat-text-secondary dark:text-flat-text-secondary-dark font-medium animate-pulse">Carregando portfólio...</p>
          </div>
        </div>
      )}

      <div className={`relative z-10 ${isDataLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <Sidebar 
            personalInfo={personalInfo}
            contactInfo={contactInfo}
            isOpen={isSidebarOpen} 
            setIsOpen={setSidebarOpen} 
            currentSection={currentSection} 
            setCurrentSection={handleSectionChange}
            theme={theme}
            toggleTheme={toggleTheme}
        />
        {/* Margin left updated to w-64 equivalent */}
        <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
            <Header 
            isSidebarOpen={isSidebarOpen}
            profilePic={personalInfo.profilePic}
            toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} 
            />
            <main className="flex-1 p-6 sm:p-8 md:p-12 lg:p-16">
                <div className="w-full h-full max-w-6xl mx-auto">
                    {renderContent()}
                </div>
            </main>
        </div>
      </div>

      {zoomedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4 cursor-pointer animate-fade-in"
          onClick={() => setZoomedImage(null)}
        >
          <img 
            src={zoomedImage} 
            alt="Imagem ampliada do projeto"
            className="max-w-full max-h-full rounded-[10px] object-contain shadow-2xl"
          />
          <button className="absolute top-6 right-6 text-white/70 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
