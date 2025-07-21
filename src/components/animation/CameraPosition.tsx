import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import gsap from 'gsap';

const CameraPosition = ({ sectionIndex }: { sectionIndex: number }) => {
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

export default CameraPosition;
