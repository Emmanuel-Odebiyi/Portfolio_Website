import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleSwarm = () => {
  const ref = useRef<THREE.Points>(null);

  const sphere = useMemo(() => {
    const counts = 1800;
    const positions = new Float32Array(counts * 3);
    for (let i = 0; i < counts; i++) {
      const phi = Math.acos(-1 + (2 * i) / counts);
      const theta = Math.sqrt(counts * Math.PI) * phi;
      const r = 4.5 + Math.random() * 2.5;
      positions[i * 3]     = r * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 12;
      ref.current.rotation.y -= delta / 18;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]} position={[0, 0, -2.8]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#d97706"   /* Amber/Gold — warm authority accent */
          size={0.018}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.25}
        />
      </Points>
    </group>
  );
};

const InfiniteGrid = () => {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((_, delta) => {
    if (gridRef.current) {
      gridRef.current.position.z += delta * 1.35;
      if (gridRef.current.position.z > 1) {
        gridRef.current.position.z = 0;
      }
    }
  });

  return (
    <gridHelper
      ref={gridRef}
      /* Dark navy grid lines to match new dark palette */
      args={[100, 100, '#1e3a5f', '#0f2035']}
      position={[0, -3.5, -20]}
    />
  );
};

export const Aurora: React.FC = () => {
  return (
    /* Dark base color #0a0f1e — Deep Space Navy */
    <div className="fixed inset-0 z-[-1] pointer-events-none" style={{ backgroundColor: '#0a0f1e' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        {/* Fog fades grid into the dark base colour */}
        <fog attach="fog" args={['#0a0f1e', 5, 25]} />
        <ParticleSwarm />
        <InfiniteGrid />
      </Canvas>
    </div>
  );
};
