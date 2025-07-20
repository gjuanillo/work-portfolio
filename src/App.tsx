import './App.css';
import Navbar from './components/Navbar';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

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

    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });

    return <points ref={meshRef} geometry={geometry} material={material} />;
}

function App() {
    const waveAmplitude = useRef(0.2);

    return (
        <div className="relative w-screen min-h-screen snap-y snap-mandatory">
            <Navbar />
            <Canvas className="fixed top-0 left-0 w-full h-full -z-10">
                <WaveBackground amplitudeRef={waveAmplitude} />
            </Canvas>


            <section className="section h-screen snap-start flex items-center justify-center text-white">
                <h1 className="text-4xl">Welcome to My Portfolio</h1>
            </section>

            <section className="section h-screen snap-start flex items-center justify-center text-white">
                <h1 className="text-4xl">About Me</h1>
            </section>

            <section className="section h-screen snap-start flex items-center justify-center text-white">
                <h1 className="text-4xl">Projects</h1>
            </section>
        </div>
    );
}

export default App;
