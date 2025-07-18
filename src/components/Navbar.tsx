import type React from "react";
import { Twirl as Hamburger } from 'hamburger-react'
import logo from '../assets/Logo-Full-Light.png';
import github from '../assets/Github_Cyan.png';
import linkedIn from '../assets/LinkedIn_Cyan.png';
import twitter from '../assets/X-Cyan.png';
import ToggleButton from "./shared/ToggleButton";

const Navbar: React.FC = () => {
    return (
        <nav className="flex justify-between items-center px-15 py-5 h-25">
            <div className="h-full">
                {/* Left */}
                {/* Logo  */}
                <img src={logo} alt="" className="h-full w-auto" />
            </div>
            <div className="flex gap-5 h-full">
                {/* Right */}
                <div className="flex h-full items-center">
                    {/* Language Toggle */}
                    <ToggleButton />
                </div>
                <div className="flex gap-2 h-full items-center">
                    {/* Buttons */}
                    <img src={github} alt="" className="h-2/5 w-auto" />
                    <img src={linkedIn} alt="" className="h-2/3 w-auto" />
                    <img src={twitter} alt="" className="h-2/5 w-auto" />
                    <Hamburger color="#14C1ED" />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
