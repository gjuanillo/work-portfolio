import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Twirl as Hamburger } from 'hamburger-react';
import logo from '../assets/Logo-Full-Light.png';
import github from '../assets/Github_Cyan.png';
import linkedIn from '../assets/LinkedIn_Cyan.png';
import twitter from '../assets/X-Cyan.png';
import ToggleButton from "./shared/ToggleButton";
import type { NavbarProps } from "./types/types";
import Menu from "./shared/Menu";

const Navbar: React.FC<NavbarProps> = ({ language, setLanguage }) => {
    const logoRef = useRef(null);
    const socialRefs = useRef<(HTMLAnchorElement | null)[]>([]);
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
                    <a href="/">
                        <img src={logo} alt="Logo" className="h-full w-auto max-h-18" />
                    </a>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4">
                    <div ref={langRef}>
                        <ToggleButton language={language} setLanguage={setLanguage} />
                    </div>
                    <div className="hidden md:flex items-center gap-3">
                        {[github, linkedIn, twitter].map((src, idx) => (
                            <a
                                key={idx}
                                ref={(el) => {
                                    socialRefs.current[idx] = el;
                                }}
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
                    <Hamburger toggled={isOpen} toggle={setIsOpen} color="#14C1ED" size={30} />
                </div>
            </nav>
            <Menu isOpen={isOpen} setIsOpen={setIsOpen} language={language} />
        </>
    );
};

export default Navbar;
