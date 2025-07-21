import { useRef } from "react";
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import circleTexture from '../../assets/circle-sprite.png';

const WaveBackground = ({ amplitudeRef }: { amplitudeRef: React.MutableRefObject<number> }) => {
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

export default WaveBackground;
