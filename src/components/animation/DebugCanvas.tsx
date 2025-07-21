import { useEffect } from "react";
import { useThree } from '@react-three/fiber';

const DebugCanvas = () => {
    const { gl, size, camera } = useThree();

    useEffect(() => {
        console.log('Canvas size:', size);
        console.log('Camera:', camera);
        console.log('WebGL Renderer:', gl.domElement); // the actual canvas
    }, [size, camera, gl.domElement]);

    return null;
}

export default DebugCanvas;
