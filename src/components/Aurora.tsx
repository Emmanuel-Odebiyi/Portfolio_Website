import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleSwarm = () => {
  const ref = useRef<THREE.Points>(null);

  // Generate a sphere of particles
  const sphere = useMemo(() => {
    const counts = 2000;
    const positions = new Float32Array(counts * 3);
    for (let i = 0; i < counts; i++) {
        const phi = Math.acos(-1 + (2 * i) / counts);
        const theta = Math.sqrt(counts * Math.PI) * phi;
        // Increased radius since we are pushing the group backwards
        const r = 4.5 + Math.random() * 2.5; 
        positions[i * 3] = r * Math.cos(theta) * Math.sin(phi);
        positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
        positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    // Pushed back slightly on the Z axis strictly to keep particles away from text!
    <group rotation={[0, 0, Math.PI / 4]} position={[0, 0, -2.8]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#0ea5e9"    
          size={0.02}        // Reverted to a much smaller size
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.35}     // Significantly lowered opacity so it's less obvious
        />
      </Points>
    </group>
  );
};

const InfiniteGrid = () => {
  const gridRef = useRef<THREE.GridHelper>(null);
  
  useFrame((state, delta) => {
    if (gridRef.current) {
      gridRef.current.position.z += delta * 1.35; // Move grid forward (reduced by 10%)
      // 1 unit is the size of one grid square (100 size / 100 divisions = 1)
      if (gridRef.current.position.z > 1) {
        gridRef.current.position.z = 0;
      }
    }
  });

  return (
    <gridHelper 
      ref={gridRef}
      args={[100, 100, '#0284c7', '#cbd5e1']} // size, divisions, centerLineColor, gridColor
      position={[0, -3.5, -20]} 
    />
  );
};

export const Aurora: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-zinc-50">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        {/* Fog fades out the grid smoothly into the background color (zinc-50 / #f8fafc) */}
        <fog attach="fog" args={['#f8fafc', 5, 25]} />
        <ParticleSwarm />
        <InfiniteGrid />
      </Canvas>
    </div>
  );
};
