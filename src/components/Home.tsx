import { forwardRef, useEffect, useRef, useState, useImperativeHandle } from "react";
import gsap from "gsap";
import type { SectionProps } from "./types/types";
import { typeText } from "./utilities/typeText";

const Home = forwardRef<HTMLElement, SectionProps>(({ language, isActive }, ref) => {
    const homeRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const cursorRef = useRef<HTMLSpanElement>(null);
    const [titleText, setTitleText] = useState("");
    const [subtitleText, setSubtitleText] = useState("");
    const [showCursor, setShowCursor] = useState(false);

    useImperativeHandle(ref, () => homeRef.current as HTMLElement, []);

    const content = language === 'JP' ? {
        title: "クラフトマンシップと精密さ、パフォーマンス、個性を融合させたデジタル体験",
        subtitle: "フルスタック開発者として、AI に情熱を注ぎながら、現代的で実用的、そして印象に残るデジタル体験を構築しています",
        button: "つながり"
    } : {
        title: "Crafting with High-impact Precision, Effectiveness, and Personality",
        subtitle: "Full-stack developer with a passion for AI. Building modern, practical, and memorable digital experiences that elevate your brand.",
        button: "Get Connected"
    };

    useEffect(() => {
        if (!isActive) return;

        const ctx = gsap.context(() => {
            setTitleText("");
            setSubtitleText("");
            setShowCursor(true);

            gsap.set([titleRef.current, subtitleRef.current, buttonRef.current], { opacity: 0 });

            const tl = gsap.timeline();

            tl.to(titleRef.current, {
                opacity: 1,
                duration: 0.3,
                onComplete: async () => {
                    await typeText(content.title, setTitleText);
                }
            })
                .to(subtitleRef.current, {
                    opacity: 1,
                    duration: 0.5,
                    onComplete: async () => {
                        await typeText(content.subtitle, setSubtitleText, 500);
                    }
                }, "+=0.5")
                .fromTo(buttonRef.current,
                    {
                        opacity: 0,
                        scale: 0.8,
                        rotateX: -90
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        rotateX: 0,
                        duration: 0.8,
                        onComplete: () => setShowCursor(false)
                    }, "+=2")
                .to(buttonRef.current, {
                    y: -5,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "power4.inOut"
                });

            gsap.to(cursorRef.current, {
                opacity: 0,
                duration: 0.5,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut"
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

        }, homeRef);

        return () => ctx.revert();
    }, [isActive, language, content.subtitle, content.title]);

    return (
        <section
            ref={homeRef}
            className="relative h-screen snap-start flex flex-col items-center justify-center px-4 text-center overflow-hidden"
        >
            {/* Square Debris */}
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

            <div className="relative z-10 max-w-4xl">
                <h1
                    ref={titleRef}
                    className="text-white text-xl font-custom-bold sm:text-2xl md:text-3xl lg:text-4xl 
                             font-mono tracking-wide leading-tight mb-6"
                    style={{
                        textShadow: '0 0 10px rgba(20, 193, 237, 0.5), 0 0 20px rgba(20, 193, 237, 0.3)',
                        fontFamily: "'Courier New', monospace"
                    }}
                >
                    <span className="inline-block">
                        {titleText}
                        {showCursor && (
                            <span
                                ref={cursorRef}
                                className="inline-block w-0.5 h-6 bg-cyan-400 ml-1 animate-pulse"
                            />
                        )}
                    </span>
                </h1>

                <p
                    ref={subtitleRef}
                    className="text-gray-300 text-sm sm:text-base md:text-lg mt-6 max-w-2xl mx-auto
                             font-mono leading-relaxed"
                    style={{
                        fontFamily: "'Courier New', monospace"
                    }}
                >
                    <span className="inline-block">
                        {subtitleText}
                        {showCursor && titleText === content.title && (
                            <span
                                className="inline-block w-0.5 h-4 bg-cyan-400 ml-1"
                            />
                        )}
                    </span>
                </p>

                <button
                    ref={buttonRef}
                    className="relative mt-12 px-8 py-4 text-sm sm:text-base md:text-lg font-mono font-bold
                             text-cyan-400 border-2 border-cyan-400 rounded-none bg-transparent
                             transition-all duration-300 overflow-hidden group
                             hover:text-white hover:bg-cyan-400 hover:shadow-lg
                             hover:shadow-cyan-400/50 transform hover:scale-105"
                    style={{
                        clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
                        textTransform: 'uppercase',
                        letterSpacing: '2px'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent
                                  transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    <span className="relative z-10">{content.button}</span>

                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />
                </button>
            </div>

            {/* Point Debris */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>
        </section>
    );
});

export default Home;
