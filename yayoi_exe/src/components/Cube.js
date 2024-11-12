import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

const Cube = () => {
    const cubeRef = useRef();
    const [rotationSpeed, setRotationSpeed] = useState(0.01);
    const [geometryParams, setGeometryParams] = useState([1, 1, 1]);

    useFrame(() => {
        if (cubeRef.current) {
            cubeRef.current.rotation.x += rotationSpeed;
            cubeRef.current.rotation.y += rotationSpeed;
        }
    });

    const handlePointerOver = () => {
        setRotationSpeed(0.05);
    };

    const handlePointerOut = () => {
        setRotationSpeed(0.01);
    };

    const handleClick = () => {
        setGeometryParams([
            Math.random() * 2 + 0.5,
            Math.random() * 2 + 0.5,
            Math.random() * 2 + 0.5,
        ]);
    };

    return (
        <mesh
            ref={cubeRef}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            onClick={handleClick}
        >
            <boxGeometry args={geometryParams} />
            <meshBasicMaterial color={0x000000} wireframe={true} />
        </mesh>
    );
};

export default Cube;
