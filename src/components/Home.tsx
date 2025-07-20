import type { Language } from "./types/types";


const Home = ({ language }: { language: Language }) => {
    return language === 'EN' ? (
        <section className="h-screen snap-start flex flex-col items-center justify-center">
            <h1 className="text-white text-4xl">
                Crafting with High-impact Precision, Effectiveness, and Personality
            </h1>
            <p className="text-gray-300 text-lg mt-4 text-center max-w-4xl">
                Full-stack developer with a passion for AI. I build modern, practical,
                and memorable digital experiences that elevate your brand.
            </p>
        </section>
    ) : (
        <section className="h-screen snap-start flex flex-col items-center justify-center">
            <h1 className="text-white text-4xl">
                クラフトマンシップと精密さ、パフォーマンス、個性を融合させたウェブ体験
            </h1>
            <p className="text-gray-300 text-lg mt-4 text-center max-w-4xl">
                フルスタック開発者として、AI に情熱を注ぎながら、現代的で実用的、
                そして印象に残るウェブ体験を構築しています。
            </p>
        </section>
    );
}

export default Home;
