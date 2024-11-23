import React from 'react';
import { useFrame } from '@react-three/fiber';
import { extend } from '@react-three/fiber';
import { Text } from 'troika-three-text';

extend({ Text });

function YayoiText() {
    const textRef = React.useRef();

    useFrame(() => {
        if (textRef.current) {
            textRef.current.rotation.y += 0.01;
        }
    });

    return (
        <mesh ref={textRef}>
            <text
                text="Yayoi"
                fontSize={0.5} // 文字サイズ
                font="/fonts/KronaOne-Regular.ttf" // フォントのパス
                color="#FFFFFF" // 塗りつぶし色
                outlineColor="#000000" // 枠線の色
                outlineWidth={0.01} // 枠線の幅
                anchorX="center" // 中央揃え
                anchorY="middle" // 中央揃え
            />
        </mesh>
    );
}

export default YayoiText;
