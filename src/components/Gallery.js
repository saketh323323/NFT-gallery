import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

// Placeholder images for NFTs
const nftImages = [
  'img.jpg',
  
];

function Gallery() {
  const textures = nftImages.map((src) => useLoader(TextureLoader, src));

  return (
    <>
      {textures.map((texture, index) => (
        <mesh position={[index * 2, 0, 0]} key={index}>
          <planeGeometry args={[1.5, 1.5]} />
          <meshBasicMaterial map={texture} />
        </mesh>
      ))}
    </>
  );
}

export default Gallery;
