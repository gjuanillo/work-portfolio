import './App.css';
import Navbar from './components/Navbar';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Home from './components/Home';
import circleTexture from './assets/circle-sprite.png';

gsap.registerPlugin(ScrollTrigger);

function WaveBackground({ amplitudeRef }: { amplitudeRef: React.MutableRefObject<number> }) {
    const meshRef = useRef<THREE.Points>(null);

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        const mesh = meshRef.current;
        if (mesh) {
            const positions = mesh.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < positions.length; i += 3) {
                const x = positions[i];
                const z = positions[i + 2];
                positions[i + 1] =
                    Math.sin(x * 0.5 + time) * amplitudeRef.current +
                    Math.cos(z * 0.5 + time) * amplitudeRef.current;
            }
            mesh.geometry.attributes.position.needsUpdate = true;
        }
    });

    const count = 100;
    const sep = 0.3;
    const positions = [];
    for (let i = -count; i < count; i++) {
        for (let j = -count; j < count; j++) {
            positions.push(i * sep, 0, j * sep);
        }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(positions, 3)
    );

    const texture = new THREE.TextureLoader().load(circleTexture);
    const material = new THREE.PointsMaterial({
        map: texture,
        color: 0x14c1ed,
        size: 0.05,
        sizeAttenuation: true,
        transparent: true,
        alphaTest: 0.5,
        depthWrite: false,
    });

    return <points ref={meshRef} geometry={geometry} material={material} />;
}

function DebugCanvas() {
    const { gl, size, camera } = useThree();

    useEffect(() => {
        console.log('Canvas size:', size);
        console.log('Camera:', camera);
        console.log('WebGL Renderer:', gl.domElement); // the actual canvas
    }, [size, camera, gl.domElement]);

    return null;
}

function SetCamera({ sectionIndex }: { sectionIndex: number }) {
    const { camera } = useThree();

    useEffect(() => {
        const positions = [
            { x: 35, y: 0, z: 5, tilt: -Math.PI / 8 },   // Section 0
            { x: 0, y: 2, z: 5, tilt: 0 },             // Section 1
            { x: -35, y: 0, z: 5, tilt: Math.PI / 12 },  // Section 2
            { x: 0, y: 10, z: 0, tilt: 0 },  // Section 2
        ];

        const target = positions[sectionIndex] || positions[0];

        // Animate position
        gsap.to(camera.position, {
            x: target.x,
            y: target.y,
            z: target.z,
            duration: 1.5,
            ease: 'power2.inOut',
            onUpdate: () => {
                camera.lookAt(0, 0, 0);
            }
        });

        // Animate tilt (z-rotation)
        gsap.to(camera.rotation, {
            z: target.tilt,
            duration: 1.5,
            ease: 'power2.inOut'
        });
    }, [sectionIndex, camera]);

    return null;
}

function App() {
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
            { threshold: 0.4 } // adjust based on trigger sensitivity
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div className="fixed inset-0 -z-50">
                <Canvas className="w-full h-full">
                    <SetCamera sectionIndex={activeSection} />
                    <DebugCanvas />
                    <WaveBackground amplitudeRef={waveAmplitude} />
                </Canvas>
            </div>

            {/* Main content */}
            <div className="relative min-h-screen">
                <Navbar language={lang} setLanguage={setLang} />

                <main className="relative z-0 snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">

                    <Home language={lang} isActive={activeSection === 0} />

                    <section className="h-screen snap-start flex items-center justify-center">
                        <h2 className="text-white text-2xl">
                        </h2>
                    </section>

                    <section className="h-screen snap-start flex items-center justify-center">
                        <h1 className="text-white text-2xl">
                        </h1>
                    </section>

                    <section className="h-screen snap-start flex items-center justify-center">
                        <h1 className="text-white text-2xl">
                        </h1>
                    </section>
                </main>
            </div>
        </>
    );
}

export default App;
