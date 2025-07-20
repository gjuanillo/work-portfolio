import type { Language } from "./types/types";

const Home = ({ language }: { language: Language }) => {
    return language === 'JP' ? (
        <section className="h-screen snap-start flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-white text-xl font-custom-bold sm:text-2xl md:text-3xl">
                クラフトマンシップと精密さ、パフォーマンス、個性を融合させたデジタル体験
            </h1>
            <p className="text-gray-300 text-sm sm:text-base font-custom-bold md:text-lg mt-4 max-w-md md:max-w-3xl">
                フルスタック開発者として、AI に情熱を注ぎながら、現代的で実用的、そして印象に残るデジタル体験を構築しています
            </p>
            <button className="mt-8 px-6 py-3 text-sm font-custom-bold sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white 
                border border-white rounded-full transition-colors duration-300 hover:bg-white hover:text-[#14c1ed]">
                つながり
            </button>
        </section>
    ) : (
        <section className="h-screen snap-start flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl">
                Crafting with High-impact Precision, Effectiveness, and Personality
            </h1>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg font-[poppins] mt-4 max-w-md md:max-w-3xl">
                Full-stack developer with a passion for AI. Building modern, practical, and memorable digital experiences that elevate your brand.
            </p>
            <button className="mt-8 px-6 py-3 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white 
                border border-white rounded-full transition-colors duration-300 hover:bg-white hover:text-[#14c1ed]">
                Get Connected
            </button>
        </section>
    )
};

export default Home;
