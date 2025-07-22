import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { SectionProps } from "./types/types";
import { projects as projectsData } from "./utilities/projects";
import ProjectCard from "./shared/ProjectCard";

const Projects = ({ language, isActive }: SectionProps) => {
    const containerRef = useRef<HTMLElement>(null);
    const detailRef = useRef<HTMLDivElement | null>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const headerRef = useRef<HTMLHeadingElement | null>(null);
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        if (!isActive) return;

        const ctx = gsap.context(() => {
            gsap.set(cardRefs.current, { opacity: 0, y: 40 });
            gsap.set(headerRef.current, { opacity: 0, y: -20 });

            gsap.to(headerRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
            });

            gsap.to(cardRefs.current, {
                opacity: 1,
                y: 0,
                duration: 2,
                ease: "power3.out",
                stagger: 0.3,
                delay: 0.2,
            });
        }, containerRef);

        return () => ctx.revert();
    }, [isActive]);

    useEffect(() => {
        if (!isActive || !detailRef.current) return;

        const tl = gsap.timeline();

        tl.fromTo(
            detailRef.current,
            { opacity: 0, x: 40 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power3.out",
            }
        );

        return () => {
            gsap.set(detailRef.current, { opacity: 0, x: 40 });
        };
    }, [selected, isActive]);

    return (
        <section
            ref={containerRef}
            className="min-h-screen snap-start flex items-center justify-center relative overflow-hidden"
        >
            <div className="max-w-7xl w-full h-full flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-12 pt-24 px-4 sm:px-6">
                <div className="flex-1 w-full">
                    {/* Archive Header */}
                    <h2
                        ref={headerRef}
                        className="text-white text-3xl tracking-wide mb-6 text-center lg:text-left"
                    >
                        {language === "JP" ? "制作実績" : "Project Archive"}
                    </h2>

                    {/* Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-0 lg:pr-4 w-full">
                        {projectsData.map((project, index) => (
                            <div
                                key={project.id}
                                ref={(el) => {
                                    cardRefs.current[index] = el;
                                }}
                                onClick={() => setSelected(index)}
                                onMouseEnter={() => {
                                    gsap.to(cardRefs.current[index], {
                                        scale: 1.03,
                                        boxShadow: "0px 0px 20px rgba(20, 193, 237, 0.2)",
                                        duration: 0.3,
                                        ease: "power2.out",
                                    });
                                }}
                                onMouseLeave={() => {
                                    gsap.to(cardRefs.current[index], {
                                        scale: 1,
                                        boxShadow: "none",
                                        duration: 0.3,
                                        ease: "power2.inOut",
                                    });
                                }}
                                className="w-full max-w-[280px] sm:max-w-full mx-auto"
                            >
                                <ProjectCard language={language} project={project} selected={selected === index} />

                                {/* Mobile inline details */}
                                <div className="block lg:hidden mt-2">
                                    {selected === index && (
                                        <div
                                            ref={detailRef}
                                            className="border-t border-cyan-500/20 pt-2 mt-2"
                                        >
                                            <h4 className="text-white text-base font-semibold mb-1">
                                                {language === "JP" ? "プロジェクト詳細" : "Details"}
                                            </h4>
                                            <p className="text-white/80 font-mono text-sm mb-1">
                                                {language === "EN" ? project.desc : project.descJp}
                                            </p>
                                            <ul className="flex flex-wrap gap-2 text-xs mt-1">
                                                {project.tags.map((tag) => (
                                                    <li
                                                        key={tag}
                                                        className="bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded"
                                                    >
                                                        #{tag}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop detail view */}
                <div
                    ref={detailRef}
                    className="hidden lg:block flex-1 border-l border-cyan-500/30 pl-6"
                >
                    <h3 className="text-white text-xl mb-4">
                        {language === "JP" ? "プロジェクト詳細" : "Project Details"}
                    </h3>
                    <div className="text-white/80 font-mono text-sm">
                        <p className="mb-2">{language === 'EN' ? projectsData[selected].desc : projectsData[selected].descJp}</p>
                        <ul className="flex flex-wrap gap-2 text-xs mt-2">
                            {projectsData[selected].tags.map((tag) => (
                                <li
                                    key={tag}
                                    className="bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded"
                                >
                                    #{tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
