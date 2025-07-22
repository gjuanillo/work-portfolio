import { useEffect } from "react";
import gsap from "gsap";
import type { Language } from "../types/types";

type MenuProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    language: Language;
}

const Menu = ({ isOpen, setIsOpen, language }: MenuProps) => {
    useEffect(() => {
        if (isOpen) {
            gsap.from('.menu-item', {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.1,
            });
        }
    }, [isOpen]);
    return (
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
            {(language === 'EN' ? ['Home', 'About', 'Projects', 'Contact'] : ['ホーム', '紹介', 'プロジェクト', '連絡先'])
                .map((label, index) => (
                    <button
                        key={label}
                        onClick={() => {
                            const section = document.querySelectorAll('section')[index];
                            if (section) {
                                section.scrollIntoView({ behavior: 'smooth' });
                                setIsOpen(false);
                            }
                        }}
                        className="menu-item text-white text-4xl hover:text-[#14C1ED] pt-5 transition-colors duration-300"
                    >
                        <span className="text-[#14C1ED] pr-2">/</span> {label}
                    </button>
                ))}
        </div>
    );
}

export default Menu;
