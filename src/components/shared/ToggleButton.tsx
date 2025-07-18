import { useState } from "react";

const ToggleButton = () => {
    const [lang, setLang] = useState<'EN' | 'JP'>('EN');

    return (
        <div className="flex gap-2 items-center text-lg font-medium text-neutral-200">
            <button
                onClick={() => setLang('EN')}
                className={`transition-colors duration-300 ${lang === 'EN' ? 'text-[#14C1ED]' : 'text-neutral-200'}`}
            >
                EN
            </button>
            |
            <button
                onClick={() => setLang('JP')}
                className={`transition-colors duration-300 ${lang === 'JP' ? 'text-[#14C1ED]' : 'text-neutral-200'}`}
            >
                JP
            </button>
        </div>
    );
};

export default ToggleButton;
