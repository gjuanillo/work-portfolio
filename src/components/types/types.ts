
export type Language = 'EN' | 'JP';

export interface NavbarProps {
    language: Language;
    setLanguage: React.Dispatch<React.SetStateAction<'EN' | 'JP'>>
}

export interface SectionProps {
    language: Language;
    isActive: boolean;
}
