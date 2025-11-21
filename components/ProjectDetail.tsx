
import React from 'react';
import type { Project } from '../types';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onImageZoom: (imageUrl: string) => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack, onImageZoom }) => {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
         <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-flat-text-secondary dark:text-flat-text-secondary-dark hover:text-flat-primary dark:hover:text-flat-primary-dark transition-colors duration-300 font-semibold text-sm"
        >
          <ArrowLeft size={16} />
          Voltar para Projetos
        </button>
        <h1 className="text-3xl font-bold text-flat-primary dark:text-flat-primary-dark">{project.title}</h1>
      </header>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {project.images.slice(0, 3).map((img, index) => (
            <button 
              key={index} 
              className="aspect-video rounded-[10px] overflow-hidden border border-flat-border dark:border-flat-border-dark group focus:outline-none focus:ring-2 focus:ring-flat-primary dark:focus:ring-flat-primary-dark focus:ring-offset-2 focus:ring-offset-flat-bg dark:focus:ring-offset-flat-bg-dark"
              onClick={() => onImageZoom(img)}
            >
              <img 
                src={img} 
                alt={`Imagem ${index + 1} do projeto ${project.title}`} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <a 
          href={project.projectUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-flat-primary text-white dark:bg-flat-primary-dark dark:text-flat-bg-dark font-bold text-sm px-6 py-3 rounded-[10px] hover:bg-opacity-90 transition-all duration-300"
        >
          Abrir Projeto
          <ExternalLink size={16} />
        </a>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-flat-primary dark:text-flat-primary-dark">Resumo do Projeto</h2>
        <p className="text-base text-flat-text-secondary dark:text-flat-text-secondary-dark leading-relaxed">
          {project.longDescription}
        </p>
      </div>

       <div>
        <h2 className="text-xl font-bold text-flat-primary dark:text-flat-primary-dark mb-4">Tecnologias Utilizadas</h2>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="bg-flat-accent text-flat-primary dark:bg-flat-accent-dark dark:text-flat-primary-dark text-sm font-sans px-3 py-1.5 rounded-[10px]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};