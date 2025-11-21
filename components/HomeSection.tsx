
import React from 'react';
import { ArrowRight, User, Briefcase, Cpu } from 'lucide-react';
import type { PersonalInfo, Project, SkillCategory, Section } from '../types';
import { ProjectCard } from './ProjectCard';

interface HomeSectionProps {
  personalInfo: PersonalInfo;
  projects: Project[];
  skills: SkillCategory[];
  onNavigate: (section: Section) => void;
  onProjectSelect: (project: Project) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ personalInfo, projects, skills, onNavigate, onProjectSelect }) => {
    
    const LinkButton = ({ onClick, text }: { onClick: () => void, text: string }) => (
        <button
            onClick={onClick}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-flat-text-secondary hover:text-flat-primary dark:text-flat-text-secondary-dark dark:hover:text-flat-primary-dark transition-colors mt-2"
        >
            {text}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </button>
    );

    return (
        <div className="space-y-12 pb-10 pt-4">
            
            {/* 0. Hero / Cabeçalho */}
            <section className="space-y-2">
                <h2 className="text-xl font-medium text-flat-text-secondary dark:text-flat-text-secondary-dark">
                    Olá, eu sou
                </h2>
                <h1 className="text-4xl md:text-4xl font-bold text-flat-primary dark:text-flat-primary-dark tracking-tight">
                    {personalInfo.name}.
                </h1>
                <p className="text-xl text-flat-text-secondary/80 dark:text-flat-text-secondary-dark/80 font-medium">
                    {personalInfo.role}
                </p>
            </section>

            {/* 1. Sobre Mim (Resumo + Mensagem) */}
            <section>
                <div className="flex items-center gap-2 mb-4 border-b border-flat-border dark:border-flat-border-dark pb-2 max-w-max">
                    <User size={18} className="text-flat-primary dark:text-flat-primary-dark" />
                    <h3 className="text-xl font-bold text-flat-primary dark:text-flat-primary-dark">Sobre Mim</h3>
                </div>
                
                <div className="space-y-3">
                    <p className="text-lg font-bold text-flat-text-primary dark:text-flat-text-primary-dark max-w-3xl leading-snug">
                        {personalInfo.shortSummary}
                    </p>
                    <p className="text-lg text-flat-text-secondary/80 dark:text-flat-text-secondary-dark/80 max-w-2xl leading-relaxed italic">
                        "{personalInfo.welcomeMessage}"
                    </p>
                </div>

                <LinkButton onClick={() => onNavigate('sobre')} text="Ver sobre mim completo" />
            </section>

            {/* 2. Projetos */}
            <section>
                <div className="flex items-center gap-2 mb-6 border-b border-flat-border dark:border-flat-border-dark pb-2 max-w-max">
                    <Briefcase size={18} className="text-flat-primary dark:text-flat-primary-dark" />
                    <h3 className="text-xl font-bold text-flat-primary dark:text-flat-primary-dark">Projetos</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.slice(0, 3).map((project) => (
                        <ProjectCard 
                            key={project.title} 
                            project={project} 
                            onCardClick={() => onProjectSelect(project)}
                        />
                    ))}
                </div>

                <LinkButton onClick={() => onNavigate('projetos')} text="Ver todos os projetos" />
            </section>

            {/* 3. Tecnologias */}
            <section>
                <div className="flex items-center gap-2 mb-6 border-b border-flat-border dark:border-flat-border-dark pb-2 max-w-max">
                    <Cpu size={18} className="text-flat-primary dark:text-flat-primary-dark" />
                    <h3 className="text-xl font-bold text-flat-primary dark:text-flat-primary-dark">Tecnologias</h3>
                </div>
                 
                <div className="flex flex-wrap gap-2">
                    {skills.flatMap(category => category.technologies).slice(0, 8).map((tech) => (
                        <span 
                            key={tech} 
                            className="bg-white dark:bg-flat-surface-dark border border-flat-border dark:border-flat-border-dark text-flat-text-secondary dark:text-flat-text-secondary-dark text-xs font-medium px-3 py-1.5 rounded-[10px] cursor-default"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
                
                <LinkButton onClick={() => onNavigate('sobre')} text="Ver todas as tecnologias" />
            </section>

        </div>
    );
};