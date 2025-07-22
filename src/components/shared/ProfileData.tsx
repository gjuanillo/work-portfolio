import type { Language } from "../types/types";
import { calculateAge } from "../utilities/calculateAge";

const ProfileData = ({ language }: { language: Language }) => {

    const myAge = calculateAge(new Date("2002-08-22"));
    const profileData = language === 'JP' ? {
        fullName: "Gabrielle Jonathan Juanillo",
        age: myAge,
        origin: "マカティ市、フィリピン",
        title: "フルスタックエンジニア",
        languages: "フィリピン語、英語、N3日本語",
        interests: "音楽、日本文化、新技術の発見"
    } : {
        fullName: "Gabrielle Jonathan Juanillo",
        age: myAge,
        origin: "Makati City, Philippines",
        title: "Full-stack Software Developer",
        languages: "Filipino, English, N3 Japanese",
        interests: "Music, Japanese Culture, Discovering New Technologies"
    };

    return (

        <div className="space-y-1.5 sm:space-y-2 lg:space-y-3 overflow-hidden">
            {[
                { label: language === 'JP' ? '名前' : 'NAME', value: profileData.fullName },
                { label: language === 'JP' ? '年齢' : 'AGE', value: profileData.age },
                { label: language === 'JP' ? '出身' : 'ORIGIN', value: profileData.origin },
                { label: language === 'JP' ? '職業' : 'TITLE', value: profileData.title },
                { label: language === 'JP' ? '言語' : 'LANGUAGES', value: profileData.languages },
                { label: language === 'JP' ? '趣味' : 'INTERESTS', value: profileData.interests }
            ].map((item, index) => (
                <div key={item.label} className="group">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                        <div className="text-cyan-400 font-mono text-[9px] sm:text-[10px] lg:text-xs font-bold min-w-0 sm:min-w-[70px] lg:min-w-[80px] pt-0.5
                                                              group-hover:text-cyan-300 transition-colors shrink-0">
                            {item.label}:
                        </div>
                        <div className="text-gray-300 text-[10px] sm:text-xs lg:text-sm leading-tight sm:leading-relaxed flex-1
                                                              group-hover:text-white transition-colors break-words hyphens-auto">
                            {item.value}
                        </div>
                    </div>
                    {index < 5 && (
                        <div className="h-px bg-gradient-to-r from-cyan-500/20 via-cyan-500/40 to-cyan-500/20 mt-1 sm:mt-2" />
                    )}
                </div>
            ))}
        </div>
    )
}

export default ProfileData;
