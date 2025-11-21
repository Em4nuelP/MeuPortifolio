import React from 'react';
import type { Project } from '../types';
import { Eye } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onCardClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onCardClick }) => {
  return (
    <button
      onClick={onCardClick}
      className="group relative flex w-full flex-col overflow-hidden rounded-[10px] bg-white dark:bg-flat-surface-dark transition-all duration-500 hover:-translate-y-2 shadow-md dark:shadow-flat-primary-dark/10 border border-transparent hover:border-flat-border dark:hover:border-flat-border-dark"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Gradient on Hover */}
        <div className="absolute inset-0 bg-flat-primary/80 dark:bg-flat-primary-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2 text-white dark:text-flat-bg-dark font-bold px-4 py-2 border-2 border-white dark:border-flat-bg-dark rounded-[10px]">
                <Eye size={20} />
                <span>Ver Detalhes</span>
            </div>
        </div>
      </div>

      {/* Title Area - Minimal */}
      <div className="flex-shrink-0 w-full px-4 py-1 bg-white dark:bg-flat-surface-dark border-t border-flat-border dark:border-flat-border-dark group-hover:border-transparent transition-colors">
        <h3 className="text-left font-bold text-base text-flat-text-primary dark:text-flat-text-primary-dark truncate">
          {project.title}
        </h3>
        <div className="flex gap-2 mt-1 opacity-60 group-hover:opacity-100 transition-opacity text-xs text-flat-text-secondary dark:text-flat-text-secondary-dark text-left truncate">
             {project.tags.slice(0, 3).join(' • ')}
        </div>
      </div>
    </button>
  );
};