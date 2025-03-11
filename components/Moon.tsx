"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import LoadingScreen from "./LoadingScreen";

interface MoonProps {
  onLoad: () => void;
}

export default function Moon({ onLoad }: MoonProps) {
  const moonRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/moonx/scene.gltf");
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (scene) {
      onLoad();
    }
  }, [scene, onLoad]);

  useFrame(({ camera }) => {
    const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    
    if (moonRef.current) {
      if (!isDragging) {
        const scrollRotation = scrollProgress * Math.PI * 2; // Negative value for correct rotation direction
        const idleRotation = performance.now() * 0.0005;
        moonRef.current.rotation.y = scrollRotation + idleRotation;
      }
      
      const baseScale = 0.6;
      const scaleIncrease = 3;
      const targetScale = baseScale + (scrollProgress * scaleIncrease);
      moonRef.current.scale.setScalar(targetScale);

      camera.position.z = 15 - (scrollProgress * 12);
      camera.position.y = scrollProgress * 2;
    }
  });

  const handlePointerDown = (e: THREE.Event) => {
    setIsDragging(true);
    setPreviousMousePosition({ x: (e as unknown as MouseEvent).clientX, y: (e as unknown as MouseEvent).clientY });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerMove = (e: THREE.Event) => {
    if (isDragging && moonRef.current) {
      const deltaX = ((e as unknown as MouseEvent).clientX - previousMousePosition.x) * 0.005;
      moonRef.current.rotation.y += deltaX;
      setPreviousMousePosition({ 
        x: (e as unknown as MouseEvent).clientX, 
        y: (e as unknown as MouseEvent).clientY 
      });
    }
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <group 
        ref={moonRef} 
        position={[0, 0, 0]}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp}
        onPointerMove={handlePointerMove}
      >
        <primitive object={scene} scale={0.6} />
      </group>
    </>
  );
}