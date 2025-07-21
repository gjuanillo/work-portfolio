import profile from '../assets/Profile.jpg';
import type { SectionProps } from "./types/types";

const About = ({ language, isActive }: SectionProps) => {
    const myAge = calculateAge(new Date("2002-08-22"));
    return language === 'JP' ? (
        <section className="h-screen snap-start flex items-center justify-center">
            <div className="flex">
                <div>
                    <h1>Tech Stack</h1>
                    <p>Java Spring Framework</p>
                    <p>React Typescript + Tailwind + GSAP + Three</p>
                    <p>Linux</p>
                    <p>NeoVim</p>
                    <p>Tmux</p>
                    <p>Docker</p>
                    <p>PostgreSQL</p>
                    <p>Figma</p>
                </div>
                <div>
                    <img src={profile} alt="Profile" width={300} />
                    <p>Full Name: Gabrielle Jonathan Juanillo</p>
                    <p>Age: {myAge}</p>
                    <p>Origin: Makati City, Philippines</p>
                    <p>Title: Full-stack Software Developer</p>
                    <p>Language: Filipino, English, N3 Japanese</p>
                    <p>Interest: Music, Japanese Literature, Discovering New Technologies</p>
                </div>
            </div>
        </section>
    ) : (
        <section className="h-screen snap-start flex items-center justify-center">
            <h2 className="text-white text-2xl">
                Hello
            </h2>
        </section>
    );
}

const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();

    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    // Adjust if birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    return age;
};

export default About;
