import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';


const Cube = ({
    initialSpeed = 0.01,
    hoverSpeed = 0.02,
    color = 'black',
    hoverColor = 'black',
    initialScale = 1,
    hoverScale = 2,
}) => {
    const meshRef = useRef();
    const [rotationSpeed, setRotationSpeed] = useState(initialSpeed);
    const [isHovered, setIsHovered] = useState(false);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += rotationSpeed;
            meshRef.current.rotation.y += rotationSpeed;
        }
    });

    const handlePointerOver = () => {
        setIsHovered(true);
        setRotationSpeed(hoverSpeed);
    };

    const handlePointerOut = () => {
        setIsHovered(false);
        setRotationSpeed(initialSpeed);
    };

    return (
        <mesh
            ref={meshRef}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            scale={isHovered ? hoverScale : initialScale}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={isHovered ? hoverColor : color} />
        </mesh>
    );
};

export default Cube;