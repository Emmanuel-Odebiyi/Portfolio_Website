import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleSwarm = ({ isDark }: { isDark: boolean }) => {
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
          key={isDark ? 'dark-particles' : 'light-particles'}
          transparent
          color="#d97706"   /* Amber/Gold — warm authority accent */
          size={isDark ? 0.018 : 0.015}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={isDark ? 0.25 : 0.16}
        />
      </Points>
    </group>
  );
};

const InfiniteGrid = ({ isDark }: { isDark: boolean }) => {
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
      key={isDark ? 'dark-grid' : 'light-grid'}
      /* Subtle slate-blue lines in light mode to not look harsh */
      args={[100, 100, isDark ? '#1e3a5f' : 'rgba(17, 31, 46, 0.12)', isDark ? '#0f2035' : 'rgba(17, 31, 46, 0.04)']}
      position={[0, -3.5, -20]}
    />
  );
};

interface AuroraCanvasProps {
  isDark: boolean;
  bgColor: string;
}

export const AuroraCanvas: React.FC<AuroraCanvasProps> = ({ isDark, bgColor }) => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      {/* Dynamic fog that matches active background color */}
      <fog attach="fog" args={[bgColor, 5, 25]} />
      <ParticleSwarm isDark={isDark} />
      <InfiniteGrid isDark={isDark} />
    </Canvas>
  );
};

export default AuroraCanvas;
