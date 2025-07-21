
export const getSizeClass = (size: string) => {
    switch (size) {
        case 'lg': return 'w-44 h-44 sm:w-48 sm:h-48';
        case 'md': return 'w-40 h-28 sm:w-48 sm:h-32';
        case 'sm': return 'w-24 h-24 sm:w-28 sm:h-28';
        default: return 'w-24 h-24 sm:w-28 sm:h-28';
    }
};

export const getSizeClassBack = (size: string) => {
    switch (size) {
        case 'lg': return 'w-28 h-28 md:w-26 md:h-26 lg:w-32 lg:h-32';
        case 'md': return 'w-24 h-20 md:w-22 md:h-22 lg:w-28 lg:h-28';
        case 'sm': return 'w-16 h-16 md:w-18 md:h-18 lg:w-24 lg:h-24';
        default: return 'w-16 h-16 md:w-18 md:h-18 lg:w-24 lg:h-24';
    }
};

