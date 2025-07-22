import React from 'react';

type Project = {
    id: string;
    title: string;
    desc: string;
    image: string;
    tags: string[];
};

type ProjectCardProps = {
    project: Project;
    selected?: boolean;
};

const ProjectCard = ({ project, selected = false }: ProjectCardProps) => {
    return (
        <div
            className={`
                relative group p-4 rounded-xl border-2 transition-all duration-300
                backdrop-blur-md bg-gradient-to-br from-gray-900/40 to-gray-800/40
                border-cyan-500/30 hover:border-cyan-400/60
                ${selected ? 'shadow-lg shadow-cyan-400/20 scale-[1.015]' : ''}
                cursor-pointer overflow-hidden
            `}
        >
            {/* Scanline effect */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
                           transform -translate-x-full group-hover:translate-x-full
                           -skew-x-12 transition-transform duration-1000" />

            {/* Image */}
            <div className="w-full aspect-video mb-3 rounded-lg overflow-hidden border border-cyan-500/20">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Title */}
            <h4 className="text-white font-semibold text-lg relative z-10">
                {project.title}
            </h4>
        </div>
    );
};

export default ProjectCard;
