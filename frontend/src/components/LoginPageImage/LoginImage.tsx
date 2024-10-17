import React from 'react';

interface ImageProps {
    imagePath: string;
}

function LoginImage({ imagePath }: ImageProps) {
    return (
        <img 
            src={imagePath} 
            style={{ width: '200px', height: '200px', objectFit: 'cover' }} 
        />
    );
}

export default LoginImage;