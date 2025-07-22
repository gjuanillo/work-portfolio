import Navbar from './components/Navbar';
import { Canvas } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Home from './components/Home';
import About from './components/About';
import WaveBackground from './components/animation/WaveBackground';
import DebugCanvas from './components/animation/DebugCanvas';
import CameraPosition from './components/animation/CameraPosition';
import Projects from './components/Projects';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
    const contactRef = useRef<HTMLElement>(null);
    const homeRef = useRef<HTMLElement>(null);
    const waveAmplitude = useRef(1.5);
    const [lang, setLang] = useState<'EN' | 'JP'>('JP');
    const [activeSection, setActiveSection] = useState(0);

    useEffect(() => {
        const sections = document.querySelectorAll('section');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = [...sections].indexOf(entry.target as HTMLElement);
                        setActiveSection(index);
                    }
                });
            },
            { threshold: 0.4 } // trigger sensitivity
        );
        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div className="fixed inset-0 -z-50">
                <Canvas className="w-full h-full">
                    <CameraPosition sectionIndex={activeSection} />
                    <DebugCanvas />
                    <WaveBackground amplitudeRef={waveAmplitude} />
                </Canvas>
            </div>

            {/* Main content */}
            <div className="relative min-h-screen">
                <Navbar language={lang} setLanguage={setLang} />
                <main className="relative z-0 snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
                    <Home ref={homeRef} contactRef={contactRef} language={lang} isActive={activeSection === 0} />
                    <About language={lang} isActive={activeSection === 1} />
                    <Projects language={lang} isActive={activeSection === 2} />
                    <Contact ref={contactRef} language={lang} isActive={activeSection === 3} />
                </main>
            </div>
        </>
    );
}

export default App;
