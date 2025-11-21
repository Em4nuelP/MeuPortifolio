import React from 'react';
import type { Section, PersonalInfo, ContactInfo, SidebarProps } from '../types';
import { Home, Briefcase, Mail, Github, Linkedin, X, User, Sun, Moon } from 'lucide-react';

const NavLink: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-[10px] transition-all duration-200 group ${
      isActive
        ? 'bg-flat-primary text-white dark:bg-flat-primary-dark dark:text-flat-bg-dark shadow-md shadow-flat-primary/20'
        : 'text-flat-text-secondary dark:text-flat-text-secondary-dark hover:bg-flat-accent dark:hover:bg-flat-surface-dark hover:text-flat-primary dark:hover:text-flat-primary-dark'
    }`}
  >
    <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
        {icon}
    </span>
    <span className={`font-medium text-sm ${isActive ? 'font-bold' : ''}`}>{label}</span>
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ personalInfo, contactInfo, isOpen, setIsOpen, currentSection, setCurrentSection, theme, toggleTheme }) => {
  const handleNavClick = (section: Section) => {
    setCurrentSection(section);
    setIsOpen(false); // Close sidebar on mobile after navigation
  };
  
  const githubLink = contactInfo.socialLinks.find(link => link.name === 'Github');
  const linkedinLink = contactInfo.socialLinks.find(link => link.name === 'LinkedIn');

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 bg-flat-sidebar-bg dark:bg-flat-sidebar-bg-dark w-64 flex flex-col transform transition-transform duration-300 ease-in-out z-40 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } border-r border-flat-border dark:border-flat-border-dark shadow-2xl md:shadow-none`}
      >
        {/* Mobile Header inside Sidebar */}
        <div className="flex justify-between items-center md:hidden p-6 pb-0">
            <h1 className="text-xl font-bold text-flat-primary dark:text-flat-primary-dark">Menu</h1>
            <button onClick={() => setIsOpen(false)} className="p-2 rounded-[10px] bg-flat-surface dark:bg-flat-surface-dark text-flat-text-secondary dark:text-flat-text-secondary-dark hover:text-flat-primary dark:hover:text-flat-primary-dark">
                <X size={20} />
            </button>
        </div>
        
        {/* Scrollable Content Area */}
        <div className="flex flex-col flex-grow overflow-y-auto no-scrollbar">
          {/* Profile Card Section */}
          <div className="w-full relative mb-4">
            {/* Banner Image - Full Width */}
            <div className="h-40 w-full overflow-hidden relative">
               <img 
                src={personalInfo.bannerPic} 
                alt="Banner" 
                className="w-full h-full object-cover"
               />
            </div>
            
            {/* Profile Info Container */}
            <div className="px-4 relative z-20 flex flex-col items-center w-full">
                {/* Avatar - Overlapping Banner - Reduced Size */}
                <div className="-mt-16 mb-3">
                    <img
                    src={personalInfo.profilePic}
                    alt="Foto do Perfil"
                    className="w-36 h-36 rounded-[10px] object-cover border-4 border-flat-sidebar-bg dark:border-flat-sidebar-bg-dark shadow-lg"
                    />
                </div>
                
                {/* Name & Role - Compact */}
                <div className="space-y-1 text-center w-full">
                    <h2 className="text-3xl font-bold text-flat-text-primary dark:text-flat-text-primary-dark leading-tight">
                        {personalInfo.name}
                    </h2>
                    <div className="flex justify-center">
                        <p className="text-xs font-medium text-flat-text-secondary dark:text-flat-text-secondary-dark bg-flat-accent/50 dark:bg-flat-surface-dark inline-block px-3 py-1 rounded-[10px]">
                            {personalInfo.role}
                        </p>
                    </div>
                </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="w-full flex flex-col space-y-1 px-3 mb-4">
            <div className="px-4 pb-2">
                <p className="text-[10px] font-bold text-flat-text-secondary/50 dark:text-flat-text-secondary-dark/50 uppercase tracking-wider text-center md:text-left">Navegação</p>
            </div>
            <NavLink
              icon={<Home size={18} />}
              label="Início"
              isActive={currentSection === 'inicio'}
              onClick={() => handleNavClick('inicio')}
            />
            <NavLink
              icon={<User size={18} />}
              label="Sobre Mim"
              isActive={currentSection === 'sobre'}
              onClick={() => handleNavClick('sobre')}
            />
            <NavLink
              icon={<Briefcase size={18} />}
              label="Projetos"
              isActive={currentSection === 'projetos'}
              onClick={() => handleNavClick('projetos')}
            />
            <NavLink
              icon={<Mail size={18} />}
              label="Contato"
              isActive={currentSection === 'contato'}
              onClick={() => handleNavClick('contato')}
            />
          </nav>
        </div>

        {/* Footer / Socials */}
        <div className="p-4 border-t border-flat-border dark:border-flat-border-dark bg-flat-sidebar-bg dark:bg-flat-sidebar-bg-dark">
          <div className="flex justify-between items-center px-2">
            <div className="flex gap-2">
                {linkedinLink && (
                    <a href={linkedinLink.url} target="_blank" rel="noopener noreferrer" className="text-flat-text-secondary dark:text-flat-text-secondary-dark hover:text-[#0A66C2] dark:hover:text-[#0A66C2] transition-colors duration-300 p-2 rounded-[10px] hover:bg-white dark:hover:bg-flat-surface-dark">
                    <Linkedin size={20} />
                    </a>
                )}
                {githubLink && (
                    <a href={githubLink.url} target="_blank" rel="noopener noreferrer" className="text-flat-text-secondary dark:text-flat-text-secondary-dark hover:text-black dark:hover:text-white transition-colors duration-300 p-2 rounded-[10px] hover:bg-white dark:hover:bg-flat-surface-dark">
                    <Github size={20} />
                    </a>
                )}
            </div>
            <button onClick={toggleTheme} className="text-flat-text-secondary dark:text-flat-text-secondary-dark hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-300 p-2 rounded-[10px] hover:bg-white dark:hover:bg-flat-surface-dark">
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
          <p className="text-[10px] text-center text-flat-text-secondary/40 dark:text-flat-text-secondary-dark/40 mt-2">
            © 2024
          </p>
        </div>
      </aside>
      
      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"></div>}
    </>
  );
};