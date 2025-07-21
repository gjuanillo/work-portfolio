export const typeText = (text: string, setter: (text: string) => void, delay: number = 0) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            let currentIndex = 0;
            const interval = setInterval(() => {
                if (currentIndex <= text.length) {
                    setter(text.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(interval);
                    resolve();
                }
            }, 20); //Typing Speed 
        }, delay);
    });
};

