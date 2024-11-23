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
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [exploded, redirectUrl]);

    const handlePointerMove = (event) => {
        if (!exploded && isHovering.current) {
            // const x = event.clientX / size.width - 0.5;
            // const y = event.clientY / size.height - 0.5;
            const rotationX = 0.03;
            const rotationY = 0.03;
            setRotationSpeed({ x: rotationX, y: rotationY });
        }
    };

    const handlePointerOver = () => {
        isHovering.current = true;
        window.addEventListener('pointermove', handlePointerMove);
    };

    const handlePointerOut = () => {
        isHovering.current = false;
        window.removeEventListener('pointermove', handlePointerMove);
        setRotationSpeed({ x: 0.01, y: 0.01 });
    };

    const handleClick = (event) => {
        if (!exploded) {
            clickPosition.current.set(event.point.x, event.point.y, event.point.z);

            const newFragments = Array.from({ length: 500 }, () => {
                const direction = new Vector3(
                    Math.random() - 0.5,
                    Math.random() - 0.5,
                    Math.random() - 0.5
                ).normalize();
                const velocity = direction.multiplyScalar(Math.random() * 0.5 + 0.3);

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
                    <sphereGeometry args={[0.5, 4, 4]} />
                    <meshBasicMaterial color={"#000000"} wireframe={true} />
                </mesh>
            ))}
        </>
    );
};

export default Cube;
