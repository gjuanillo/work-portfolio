import type { NavbarProps } from "../types/types";

const ToggleButton: React.FC<NavbarProps> = ({ language, setLanguage }) => {

    return (
        <div className="flex gap-2 items-center text-lg font-medium text-neutral-200">
            <button
                onClick={() => setLanguage('EN')}
                className={`transition-colors duration-300 cursor-pointer ${language === 'EN' ? 'text-[#14C1ED]' : 'text-neutral-200'}`}
            >
                EN
            </button>
            |
            <button
                onClick={() => setLanguage('JP')}
                className={`transition-colors duration-300 curosr-pointer ${language === 'JP' ? 'text-[#14C1ED]' : 'text-neutral-200'}`}
            >
                JP
            </button>
        </div>
    );
};

export default ToggleButton;
