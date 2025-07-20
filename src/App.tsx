import './App.css';
import Navbar from './components/Navbar';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
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

    const material = new THREE.PointsMaterial({ color: 0x14c1ed, size: 0.04 });

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

function SetCamera() {
    const { camera } = useThree();

    useEffect(() => {
        camera.position.set(35, 0, 5); // x, y, z
        camera.lookAt(0, 0, 0);       // focus on center
        camera.rotation.z = -Math.PI / 12;
    }, [camera]);

    return null;
}

function App() {
    const waveAmplitude = useRef(1);

    return (
        <>
            <div className="fixed inset-0 -z-50">
                <Canvas className="w-full h-full">
                    <SetCamera />
                    <DebugCanvas />
                    <WaveBackground amplitudeRef={waveAmplitude} />
                </Canvas>
            </div>

            {/* Main content */}
            <div className="relative min-h-screen">
                <Navbar />

                <main className="relative z-0">
                    <section className="h-screen flex items-center justify-center">
                        <h1 className="text-white text-4xl font-bold">
                            Header
                        </h1>
                    </section>

                    <section className="h-screen flex items-center justify-center">
                        <h2 className="text-white text-2xl">
                        </h2>
                    </section>
                </main>
            </div>
        </>
    );
}

export default App;
