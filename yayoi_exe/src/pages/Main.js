import React from 'react'
import { Canvas } from '@react-three/fiber';
import Cube from '../components/Cube';
import '../assets/styles/main.css'

const Main = () => {
    return (
        <div className='main-container'>
            {/* <h2>Main Content</h2>
            <p>This is the main content area. Below is some dummy content to test vertical scrolling.</p>

            {[...Array(50)].map((_, index) => (
                <p key={index}>This is some dummy content to ensure scrolling is possible. Item #{index + 1}</p>
            ))} */}
            <div className='full-canvas'>
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />

                    <Cube
                        initialSpeed={0.01}
                        hoverSpeed={0.02}
                        color="#000000"
                        hoverColor="#FFFFFF"
                        initialScale={2}
                        hoverScale={2.5}
                    />
                </Canvas>
            </div>
        </div >
    )
}

export default Main