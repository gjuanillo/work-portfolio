import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import profile from '../assets/Profile.jpg';
import type { SectionProps } from "./types/types";
import { techStacks } from "./utilities/techStacks";
import { calculateAge } from "./utilities/calculateAge";

const About = ({ language, isActive }: SectionProps) => {
    const containerRef = useRef<HTMLElement>(null);
    const bentoRef = useRef<HTMLDivElement>(null);
    const profileCardRef = useRef<HTMLDivElement>(null);
    const cardInnerRef = useRef<HTMLDivElement>(null);
    const profileImageRef = useRef<HTMLDivElement>(null);
    const techItemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [hoveredTech, setHoveredTech] = useState<number | null>(null);
    const [profileHovered, setProfileHovered] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    const myAge = calculateAge(new Date("2002-08-22"));

    const profileData = language === 'JP' ? {
        fullName: "Gabrielle Jonathan Juanillo",
        age: myAge,
        origin: "マカティ市、フィリピン",
        title: "フルスタックソフトウェア開発者",
        languages: "フィリピン語、英語、N3日本語",
        interests: "音楽、日本文学、新技術の発見"
    } : {
        fullName: "Gabrielle Jonathan Juanillo",
        age: myAge,
        origin: "Makati City, Philippines",
        title: "Full-stack Software Developer",
        languages: "Filipino, English, N3 Japanese",
        interests: "Music, Japanese Literature, Discovering New Technologies"
    };

    useEffect(() => {
        if (!isActive) return;

        const ctx = gsap.context(() => {
            // Reset states
            gsap.set([bentoRef.current, profileCardRef.current], { opacity: 0, y: 50 });
            gsap.set(techItemsRef.current, { opacity: 0, scale: 0.8, rotateX: -90 });

            const tl = gsap.timeline();

            // Show desktop bento grid
            if (window.innerWidth >= 1024) {
                tl.to(bentoRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out"
                })
                    .to(techItemsRef.current, {
                        opacity: 1,
                        scale: 1,
                        rotateX: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "back.out(1.4)"
                    }, "-=0.4");
            }

            // Animate profile card
            tl.to(profileCardRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }, window.innerWidth >= 1024 ? "-=0.6" : "0");

            // Floating animation for tech items
            techItemsRef.current.forEach((item, index) => {
                if (item) {
                    gsap.to(item, {
                        y: Math.sin(index * 0.5) * 10,
                        duration: 2 + Math.random() * 2,
                        repeat: -1,
                        yoyo: true,
                        ease: "power2.inOut",
                        delay: index * 0.2
                    });
                }
            });

            // Profile image rotation
            gsap.to(profileImageRef.current, {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: "none"
            });

        }, containerRef);

        return () => ctx.revert();
    }, [isActive, language]);

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);

        gsap.to(cardInnerRef.current, {
            rotateY: isFlipped ? 0 : 180,
            duration: 0.8,
            ease: "power2.inOut"
        });
    };

    const getSizeClass = (size: string) => {
        switch (size) {
            case 'lg': return 'w-44 h-44 sm:w-48 sm:h-48';
            case 'md': return 'w-40 h-28 sm:w-48 sm:h-32';
            case 'sm': return 'w-24 h-24 sm:w-28 sm:h-28';
            default: return 'w-24 h-24 sm:w-28 sm:h-28';
        }
    };

    return (
        <section
            ref={containerRef}
            className="min-h-screen snap-start flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-0 relative overflow-hidden"
        >
            {/* Ambient background */}
            {/* <div className="absolute inset-0"> */}
            {/*     {[...Array(30)].map((_, i) => ( */}
            {/*         <div */}
            {/*             key={i} */}
            {/*             className="absolute w-px h-px bg-cyan-400/20 rounded-full animate-pulse" */}
            {/*             style={{ */}
            {/*                 left: `${Math.random() * 100}%`, */}
            {/*                 top: `${Math.random() * 100}%`, */}
            {/*                 animationDelay: `${Math.random() * 3}s`, */}
            {/*                 animationDuration: `${1 + Math.random() * 2}s` */}
            {/*             }} */}
            {/*         /> */}
            {/*     ))} */}
            {/* </div> */}

            <div className="max-w-8xl mx-auto w-full flex flex-col justify-center lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-center lg:items-start">

                {/* Left: Tech Stack Bento Grid - Hidden on mobile */}
                <div
                    ref={bentoRef}
                    className="hidden lg:block flex-1 max-w-4xl px-10"
                >
                    <h2 className="text-xl sm:text-2xl lg:text-3xl text-white mb-6 lg:mb-8 text-center lg:text-left">
                        Tech Stack
                    </h2>

                    <div className="flex flex-wrap gap-3">
                        {techStacks.map((tech, index) => (
                            <div
                                key={tech.name}
                                ref={(el) => techItemsRef.current[index] = el}
                                className={`
                                  ${getSizeClass(tech.size)}
                                  ${tech.color} ${tech.border} ${hoveredTech === index ? tech.glow : ''}
                                  relative rounded-lg border-2 backdrop-blur-sm
                                  flex flex-col items-center justify-center
                                  cursor-pointer transition-all duration-300
                                  hover:scale-105 hover:z-10 group overflow-hidden
                                `}
                                onMouseEnter={() => setHoveredTech(index)}
                                onMouseLeave={() => setHoveredTech(null)}
                            >
                                {/* Scan line effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                        transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
                        transition-transform duration-1000" />

                                <div className={`mb-1 relative z-10`}>
                                    <img src={tech.image} alt={tech.name} className="w-8 h-8 sm:w-20 sm:h-20" />
                                </div>
                                <div className="text-[10px] sm:text-xs font-mono text-white text-center px-1 sm:px-2 relative z-10 opacity-80 group-hover:opacity-100 leading-tight">
                                    {tech.name}
                                </div>

                                {/* Corner brackets */}
                                <div className="absolute top-1 left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 border-t border-l border-cyan-400/50" />
                                <div className="absolute top-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 border-t border-r border-cyan-400/50" />
                                <div className="absolute bottom-1 left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 border-b border-l border-cyan-400/50" />
                                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 border-b border-r border-cyan-400/50" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Flippable Profile Card */}
                <div
                    ref={profileCardRef}
                    className="flex-1 max-w-xs sm:max-w-sm lg:max-w-md w-full"
                >
                    {/* Flip indicator for mobile */}
                    <div className="lg:hidden text-center mb-4">
                        <p className="text-cyan-400 font-mono text-xs sm:text-sm">
                            <span className="animate-pulse">&gt;</span> TAP_TO_FLIP.exe
                        </p>
                    </div>

                    <div
                        className="relative w-full aspect-[3/4] sm:aspect-[5/6] lg:aspect-[4/5] perspective-1000 cursor-pointer"
                        onClick={handleCardClick}
                        style={{ perspective: '1000px' }}
                    >
                        <div
                            ref={cardInnerRef}
                            className="relative w-full h-full transition-transform duration-800 transform-style-preserve-3d"
                            style={{ transformStyle: 'preserve-3d' }}
                        >

                            {/* Front: Profile Card */}
                            <div
                                className={`
                                    absolute inset-0 w-full h-full backface-hidden
                                    bg-gradient-to-br from-gray-900/80 to-gray-800/80 
                                    backdrop-blur-lg border-2 border-cyan-500/30 rounded-xl lg:rounded-2xl p-4 sm:p-6
                                    transition-all duration-500 hover:border-cyan-400/50
                                    ${profileHovered ? 'shadow-2xl shadow-cyan-500/20' : ''}
                                `}
                                style={{ backfaceVisibility: 'hidden' }}
                                onMouseEnter={() => setProfileHovered(true)}
                                onMouseLeave={() => setProfileHovered(false)}
                            >
                                {/* Profile Image Container */}
                                <div className="flex justify-center mb-3 sm:mb-4 lg:mb-6">
                                    <div
                                        ref={profileImageRef}
                                        className="relative w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-cyan-400/50
                                                 shadow-lg shadow-cyan-500/20"
                                    >
                                        <img
                                            src={profile}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Hologram overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent" />

                                        {/* Scanning line */}
                                        <div className={`
                                            absolute inset-x-0 h-0.5 bg-cyan-400/70 
                                            ${profileHovered ? 'animate-bounce' : ''}
                                        `}
                                            style={{ top: '40%' }} />
                                    </div>
                                </div>

                                {/* Profile Data */}
                                <div className="space-y-1.5 sm:space-y-2 lg:space-y-3 overflow-hidden">
                                    {[
                                        { label: language === 'JP' ? '名前' : 'NAME', value: profileData.fullName },
                                        { label: language === 'JP' ? '年齢' : 'AGE', value: profileData.age },
                                        { label: language === 'JP' ? '出身' : 'ORIGIN', value: profileData.origin },
                                        { label: language === 'JP' ? '職業' : 'TITLE', value: profileData.title },
                                        { label: language === 'JP' ? '言語' : 'LANGUAGES', value: profileData.languages },
                                        { label: language === 'JP' ? '趣味' : 'INTERESTS', value: profileData.interests }
                                    ].map((item, index) => (
                                        <div key={item.label} className="group">
                                            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                                                <div className="text-cyan-400 font-mono text-[9px] sm:text-[10px] lg:text-xs font-bold min-w-0 sm:min-w-[70px] lg:min-w-[80px] pt-0.5
                                                              group-hover:text-cyan-300 transition-colors shrink-0">
                                                    {item.label}:
                                                </div>
                                                <div className="text-gray-300 text-[10px] sm:text-xs lg:text-sm leading-tight sm:leading-relaxed flex-1
                                                              group-hover:text-white transition-colors break-words hyphens-auto">
                                                    {item.value}
                                                </div>
                                            </div>
                                            {index < 5 && (
                                                <div className="h-px bg-gradient-to-r from-cyan-500/20 via-cyan-500/40 to-cyan-500/20 mt-1 sm:mt-2" />
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Terminal-style corners */}
                                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-cyan-400/50" />
                                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-cyan-400/50" />
                                <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-cyan-400/50" />
                                <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-cyan-400/50" />

                                {/* Status indicator */}
                                <div className="absolute top-3 right-8 sm:top-4 sm:right-12 flex items-center gap-1 sm:gap-2">
                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse" />
                                    <span className="text-green-400 font-mono text-[10px] sm:text-xs">ONLINE</span>
                                </div>
                            </div>

                            {/* Back: Tech Stack Bento Grid */}
                            <div
                                className="absolute inset-0 w-full h-full backface-hidden
                                         bg-gradient-to-br from-gray-900/80 to-gray-800/80 
                                         backdrop-blur-lg border-2 border-cyan-500/30 rounded-xl lg:rounded-2xl p-3 sm:p-4"
                                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                            >
                                {/* Header */}
                                <div className="text-center mb-3 sm:mb-4">
                                    <h3 className="text-sm sm:text-lg font-mono font-bold text-cyan-400">
                                        <span className="inline-block animate-pulse">&gt;</span> TECH_STACK.exe
                                    </h3>
                                </div>

                                {/* Tech Stack Grid */}
                                <div className="grid grid-cols-4 grid-rows-4 gap-1 sm:gap-2 w-full h-5/6">
                                    {techStacks.map((tech, index) => (
                                        <div
                                            key={`back-${tech.name}`}
                                            className={`
                                                ${getSizeClass(tech.size)}
                                                ${tech.color} ${tech.border}
                                                relative rounded-md lg:rounded-lg border-2 backdrop-blur-sm
                                                flex flex-col items-center justify-center
                                                group overflow-hidden
                                            `}
                                        >
                                            {/* Scan line effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                                                          transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
                                                          transition-transform duration-1000" />

                                            <div className={`${tech.size === 'lg' ? 'text-lg sm:text-xl lg:text-2xl' : tech.size === 'md' ? 'text-sm sm:text-lg lg:text-xl' : 'text-xs sm:text-base lg:text-lg'} mb-1 relative z-10`}>
                                                {tech.icon}
                                            </div>
                                            <div className={`${tech.size === 'lg' ? 'text-[8px] sm:text-[10px] lg:text-xs' : 'text-[6px] sm:text-[8px] lg:text-[10px]'} font-mono text-white text-center px-1 relative z-10 
                                                          opacity-80 group-hover:opacity-100 leading-tight`}>
                                                {tech.name}
                                            </div>

                                            {/* Corner brackets */}
                                            <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 w-1 h-1 sm:w-1.5 sm:h-1.5 border-t border-l border-cyan-400/50" />
                                            <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1 h-1 sm:w-1.5 sm:h-1.5 border-t border-r border-cyan-400/50" />
                                            <div className="absolute bottom-0.5 left-0.5 sm:bottom-1 sm:left-1 w-1 h-1 sm:w-1.5 sm:h-1.5 border-b border-l border-cyan-400/50" />
                                            <div className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 w-1 h-1 sm:w-1.5 sm:h-1.5 border-b border-r border-cyan-400/50" />
                                        </div>
                                    ))}
                                </div>

                                {/* Terminal-style corners */}
                                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-cyan-400/50" />
                                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-cyan-400/50" />
                                <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-cyan-400/50" />
                                <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-cyan-400/50" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default About;
