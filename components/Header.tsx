import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  profilePic: string;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen, profilePic }) => {
  return (
    <header className="sticky top-0 bg-flat-sidebar-bg/80 dark:bg-flat-sidebar-bg-dark/80 backdrop-blur-sm p-4 z-20 md:hidden flex items-center justify-between border-b border-flat-border dark:border-flat-border-dark">
      <div className="flex items-center gap-3 min-w-0">
        {!isSidebarOpen && (
          <div className="flex items-center gap-3 animate-fade-in">
            <img src={profilePic} alt="Foto do Perfil" className="w-8 h-8 rounded-full object-cover" />
            <h1 className="text-xl font-bold text-flat-primary dark:text-flat-primary-dark">Meu Portfólio</h1>
          </div>
        )}
      </div>
      <button onClick={toggleSidebar} className="text-flat-text-secondary dark:text-flat-text-secondary-dark hover:text-flat-primary dark:hover:text-flat-primary-dark p-2">
        <Menu size={28} />
      </button>
    </header>
  );
};