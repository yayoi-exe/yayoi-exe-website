import React, { useRef, useEffect } from 'react';

const Cube = () => {
    const cubeRef = useRef();

    useEffect(() => {
        if (cubeRef.current) {
            const animate = () => {
                requestAnimationFrame(animate);
                cubeRef.current.rotation.x += 0.01;
                cubeRef.current.rotation.y += 0.01;
            };
            animate();
        }
    }, []);

    return (
        <mesh ref={cubeRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color={0x000000} wireframe={true} />
        </mesh>
    );
};

export default Cube;
