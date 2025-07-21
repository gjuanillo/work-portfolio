import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import profile from '../assets/Profile.jpg';
import type { SectionProps } from "./types/types";
import { techStacks } from "./utilities/techStacks";
import CardCorners from "./shared/CardCorners";
import OnlineStatus from "./shared/OnlineStatus";
import ProfileData from "./shared/ProfileData";
import ScanLine from "./shared/ScanLine";
import { getSizeClass, getSizeClassBack } from "./utilities/getCardSize";

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


    useEffect(() => {
        if (!isActive) return;

        const ctx = gsap.context(() => {
            const isDesktop = window.innerWidth >= 1024;

            // Reset state
            gsap.set([bentoRef.current, profileCardRef.current], {
                opacity: 0,
                y: 50,
                scale: 0.92,
            });
            gsap.set(techItemsRef.current, {
                opacity: 0,
                scale: 0.7,
                rotateX: -45,
            });

            const tl = gsap.timeline();

            if (isDesktop) {
                // Faster bento grid pop-in
                tl.to(bentoRef.current, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: "circ.out",
                });

                // Snappier tile animation
                tl.to(techItemsRef.current, {
                    opacity: 1,
                    scale: 1,
                    rotateX: 0,
                    duration: 0.35,
                    stagger: {
                        each: 0.05,
                        from: "center",
                    },
                    ease: "back.out(1.7)",
                }, "-=0.3");
            }

            // Profile card pop with spring-like bounce
            tl.to(profileCardRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                skewY: 0,
                duration: 0.4,
                ease: "power2.out",
            }, isDesktop ? "-=0.4" : "0");

            // Float animation
            techItemsRef.current.forEach((item, index) => {
                if (item) {
                    gsap.to(item, {
                        y: `+=${Math.sin(index) * 8 + 4}`,
                        duration: 1.8 + Math.random(),
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: Math.random() * 0.3,
                    });
                }
            });

            // Image slow spin
            gsap.to(profileImageRef.current, {
                rotate: 360,
                duration: 15,
                repeat: -1,
                ease: "linear",
            });

            gsap.fromTo(".tech-grid",
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 0.8,
                    scale: 1.5,
                    duration: 1,
                    stagger: 0.2,
                    repeat: -1,
                    yoyo: true,
                    ease: "power2.inOut"
                }
            );

        }, containerRef);

        return () => ctx.revert();
    }, [isActive]);

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);

        gsap.to(cardInnerRef.current, {
            rotateY: isFlipped ? 0 : 180,
            duration: 0.4,
            ease: "power2.inOut"
        });
    };

    return (
        <section
            ref={containerRef}
            className="min-h-screen snap-start flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-0 relative overflow-hidden"
        >
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="tech-grid absolute border border-cyan-500/20"
                        style={{
                            width: `${20 + Math.random() * 40}px`,
                            height: `${20 + Math.random() * 40}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            transform: `rotate(${Math.random() * 360}deg)`
                        }}
                    />
                ))}
            </div>
            <div className="max-w-8xl mx-auto w-full flex flex-col justify-center lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-center lg:items-start">
                {/* Left: Tech Stack Bento Box*/}
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
                                <ScanLine />
                                <div className={`mb-1 relative z-10`}>
                                    <img src={tech.image} alt={tech.name} className="w-8 h-8 md:w-20 md:h-20" />
                                </div>
                                <div className="text-[10px] sm:text-xs font-mono text-white text-center px-1 sm:px-2 relative z-10 opacity-80 group-hover:opacity-100 leading-tight">
                                    {tech.name}
                                </div>
                                <CardCorners isBento={true} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Flippable Profile Card */}
                <div
                    ref={profileCardRef}
                    className="flex-1 max-w-xs md:max-w-sm lg:max-w-md w-full"
                >
                    {/* Flip indicator for mobile */}

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

                                <ProfileData language={language} />
                                <CardCorners isBento={false} />
                                <OnlineStatus />
                                <div className="lg:hidden text-center mb-4 pt-5">
                                    <p className="text-cyan-400 font-mono text-xs sm:text-sm">
                                        <span className="animate-pulse">&gt;</span> Tap Card <span className="animate-pulse">&lt;</span>
                                    </p>
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
                                    <h3 className="text-sm sm:text-lg text-white">
                                        Tech Stack
                                    </h3>
                                </div>

                                {/* Tech Stack Grid */}
                                <div className="flex flex-wrap justify-center gap-1 sm:gap-2 w-full h-5/6">
                                    {techStacks.map((tech, index) => (
                                        <div
                                            key={`back-${tech.name}`}
                                            className={`
                                                ${getSizeClassBack(tech.size)}
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
                                                <img src={tech.image} alt={tech.name} className="w-8 h-8 lg:w-20 lg:h-20" />
                                            </div>
                                            <div className={`${tech.size === 'lg' ? 'text-[8px] sm:text-[10px] lg:text-xs' : 'text-[6px] sm:text-[8px] lg:text-[10px]'} font-mono text-white text-center px-1 relative z-10 
                                                          opacity-80 group-hover:opacity-100 leading-tight`}>
                                                {tech.name}
                                            </div>

                                            {/* Corner brackets */}
                                            <CardCorners isBento={true} />
                                        </div>
                                    ))}
                                </div>

                                {/* Terminal-style corners */}
                                <CardCorners isBento={false} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default About;
