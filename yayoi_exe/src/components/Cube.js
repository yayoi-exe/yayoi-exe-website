import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

const Cube = ({ redirectUrl = "https://example.com" }) => {
    const cubeRef = useRef();
    const { viewport, size } = useThree(); // Get viewport size for scaling mouse movements
    const [rotationSpeed, setRotationSpeed] = useState({ x: 0.01, y: 0.01 });
    const [exploded, setExploded] = useState(false);
    const [fragments, setFragments] = useState([]);
    const fragmentRefs = useRef([]);
    const clickPosition = useRef(new Vector3());
    const isHovering = useRef(false); // Track hover state

    useEffect(() => {
        if (exploded) {
            const timer = setTimeout(() => {
                window.location.href = redirectUrl;
            }, 3000); // 3 seconds delay

            return () => clearTimeout(timer);
        }
    }, [exploded, redirectUrl]);

    const handlePointerMove = (event) => {
        if (!exploded && isHovering.current) {
            const x = (event.clientX / size.width - 0.5) * 5;
            const y = (event.clientY / size.height - 0.5) * 5;
            // Increase rotation speed when hovering and adjust based on normalized mouse position
            const rotationX = y * 0.3; // Increased rotation speed on hover
            const rotationY = x * 0.3;
            setRotationSpeed({ x: rotationX, y: rotationY });
        }
    };

    const handlePointerOver = () => {
        isHovering.current = true; // Set hover state to true
        window.addEventListener('pointermove', handlePointerMove);
    };

    const handlePointerOut = () => {
        isHovering.current = false; // Set hover state to false
        window.removeEventListener('pointermove', handlePointerMove);
        setRotationSpeed({ x: 0.01, y: 0.01 }); // Reset to slow rotation when not hovering
    };

    const handleClick = (event) => {
        if (!exploded) {
            // Get the click position in world coordinates
            clickPosition.current.set(event.point.x, event.point.y, event.point.z);

            // Generate fragments with a faster outward velocity relative to the click position
            const newFragments = Array.from({ length: 20 }, () => {
                const direction = new Vector3(
                    Math.random() - 0.5,
                    Math.random() - 0.5,
                    Math.random() - 0.5
                ).normalize();
                const velocity = direction.multiplyScalar(Math.random() * 0.5 + 0.3); // Increased velocity for faster explosion

                return {
                    position: clickPosition.current.clone(),
                    velocity,
                };
            });
            setFragments(newFragments);
            setExploded(true);
        }
    };

    useFrame(() => {
        if (!exploded && cubeRef.current) {
            // Rotate the main cube following the mouse direction if hovering
            cubeRef.current.rotation.x += rotationSpeed.x;
            cubeRef.current.rotation.y += rotationSpeed.y;
        } else if (exploded) {
            // Update fragment positions based on their velocity and apply rotation
            fragmentRefs.current.forEach((ref, index) => {
                if (ref) {
                    ref.position.add(fragments[index].velocity);
                    ref.rotation.x += 0.05; // Rotate fragments faster as they move outward
                    ref.rotation.y += 0.05;
                }
            });
        }
    });

    if (!exploded) {
        return (
            <mesh
                ref={cubeRef}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onClick={handleClick}
            >
                <dodecahedronGeometry args={[1, 0]} />
                <meshBasicMaterial color={0x000000} wireframe={true} />
            </mesh>
        );
    }

    return (
        <>
            {fragments.map((fragment, index) => (
                <mesh
                    key={index}
                    ref={(el) => (fragmentRefs.current[index] = el)}
                    position={fragment.position}
                >
                    <sphereGeometry args={[0.15, 16, 16]} /> {/* Spherical geometry for fragments */}
                    <meshBasicMaterial color={0x000000} wireframe={true} />
                </mesh>
            ))}
        </>
    );
};

export default Cube;
