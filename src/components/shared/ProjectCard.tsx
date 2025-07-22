import type { Language } from '../types/types';
import CardCorners from './CardCorners';

type Project = {
    id: string;
    title: string;
    titleJp: string;
    desc: string;
    descJp: string;
    image: string;
    tags: string[];
};

type ProjectCardProps = {
    project: Project;
    selected?: boolean;
    language: Language;
};

const ProjectCard = ({ language, project, selected = false }: ProjectCardProps) => {
    return (
        <div
            className={`
                relative group p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300
                backdrop-blur-md bg-gradient-to-br from-gray-900/40 to-gray-800/40
                border-cyan-500/30 hover:border-cyan-400/60
                ${selected ? 'shadow-md sm:shadow-lg shadow-cyan-400/20 scale-[1.01]' : ''}
                cursor-pointer overflow-hidden
            `}
        >
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
                           transform -translate-x-full group-hover:translate-x-full
                           -skew-x-12 transition-transform duration-1000" />

            <div className="w-full aspect-[16/9] sm:aspect-video mb-2 sm:mb-3 rounded-md sm:rounded-lg overflow-hidden border border-cyan-500/20">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <h4 className="text-white font-semibold text-base sm:text-lg relative z-10">
                {language === 'EN' ? project.title : project.titleJp}
            </h4>
            <CardCorners isBento={true} />
        </div>
    );
};

export default ProjectCard;
