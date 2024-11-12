import React from 'react';
import { Canvas } from '@react-three/fiber';
import Cube from '../components/Cube';

const Main = () => {
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Canvas camera={{ position: [0, 0, 5] }}>
                <Cube />
            </Canvas>
        </div>
    );
};

export default Main;
