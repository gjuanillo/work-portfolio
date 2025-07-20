import type React from "react";
import { Twirl as Hamburger } from 'hamburger-react';
import logo from '../assets/Logo-Full-Light.png';
import github from '../assets/Github_Cyan.png';
import linkedIn from '../assets/LinkedIn_Cyan.png';
import twitter from '../assets/X-Cyan.png';
import ToggleButton from "./shared/ToggleButton";
import type { NavbarProps } from "./types/types";


const Navbar: React.FC<NavbarProps> = ({ language, setLanguage }) => {
    return (
        <nav className="fixed top-0 z-50 w-full flex justify-between items-center px-4 sm:px-6 md:px-10 lg:px-20 py-4 h-30">
            {/* Left: Logo */}
            <div className="h-full flex items-center">
                <img src={logo} alt="Logo" className="h-full w-auto max-h-18" />
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
                {/* Language Toggle */}
                <ToggleButton language={language} setLanguage={setLanguage} />

                {/* Social Icons */}
                <div className="hidden md:flex items-center gap-2">
                    <img src={github} alt="GitHub" className="h-8 w-auto" />
                    <img src={linkedIn} alt="LinkedIn" className="h-10 w-auto" />
                    <img src={twitter} alt="Twitter" className="h-8 w-auto" />
                </div>

                {/* Hamburger Menu (Always visible) */}
                <Hamburger color="#14C1ED" size={30} />
            </div>
        </nav>
    );
};

export default Navbar;
