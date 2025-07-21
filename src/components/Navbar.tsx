import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Twirl as Hamburger } from 'hamburger-react';
import logo from '../assets/Logo-Full-Light.png';
import github from '../assets/Github_Cyan.png';
import linkedIn from '../assets/LinkedIn_Cyan.png';
import twitter from '../assets/X-Cyan.png';
import ToggleButton from "./shared/ToggleButton";
import type { NavbarProps } from "./types/types";

const Navbar: React.FC<NavbarProps> = ({ language, setLanguage }) => {
    const logoRef = useRef(null);
    const socialRefs = useRef<HTMLDivElement[]>([]);
    const langRef = useRef(null);
    const navRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
    }, [isOpen]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(logoRef.current, {
                x: -50,
                opacity: 0,
                duration: 2,
                ease: 'power2.out'
            });

            gsap.from(langRef.current, {
                y: -20,
                opacity: 0,
                delay: 0.4,
                duration: 1.5,
                ease: 'power2.out'
            });

            gsap.from(socialRefs.current, {
                y: -20,
                opacity: 0,
                stagger: 0.15,
                delay: 0.6,
                duration: 1.5,
                ease: 'power2.out'
            });
        }, navRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <nav ref={navRef} className="fixed top-0 z-50 w-full flex justify-between items-center px-4 sm:px-6 md:px-10 lg:px-20 py-4 h-30">
                {/* Left: Logo */}
                <div ref={logoRef} className="h-full flex items-center">
                    <img src={logo} alt="Logo" className="h-full w-auto max-h-18" />
                </div>

                {/* Right */}
                <div className="flex items-center gap-4">
                    {/* Language Toggle */}
                    <div ref={langRef}>
                        <ToggleButton language={language} setLanguage={setLanguage} />
                    </div>

                    {/* Social Icons */}
                    <div className="hidden md:flex items-center gap-3">
                        {[github, linkedIn, twitter].map((src, idx) => (
                            <a
                                key={idx}
                                ref={(el) => el && (socialRefs.current[idx] = el)}
                                href={
                                    idx === 1
                                        ? "https://www.linkedin.com/in/gcjuanillo/"
                                        : idx === 2
                                            ? "https://x.com"
                                            : "https://github.com/gjuanillo"
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={src}
                                    alt="icon"
                                    className={`h-8 w-auto`}
                                />
                            </a>
                        ))}
                    </div>

                    {/* Hamburger Menu */}
                    <Hamburger toggled={isOpen} toggle={setIsOpen} color="#14C1ED" size={30} />
                </div>
            </nav>

            {/* Slide-in Menu */}
            <div
                className={`
                fixed inset-0 
                bg-[#3e4b4d]/10 
                backdrop-blur-lg 
                flex flex-col items-center justify-center gap-8 
                transition-all duration-500 ease-out 
                z-40
                ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
              `}
            >
                {['Home', 'About', 'Projects', 'Contact'].map((label, index) => (
                    <button
                        key={label}
                        onClick={() => {
                            const section = document.querySelectorAll('section')[index];
                            if (section) {
                                section.scrollIntoView({ behavior: 'smooth' });
                                setIsOpen(false);
                            }
                        }}
                        className="text-cyan-400 text-2xl font-mono hover:text-white transition-colors duration-300"
                    >
                        {label}
                    </button>
                ))}
            </div>
        </>
    );
};

export default Navbar;
