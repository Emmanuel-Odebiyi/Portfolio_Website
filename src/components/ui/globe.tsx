import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';

// ── Coordinate Mapping ────────────────────────────────────────────────────────
// Standard equirectangular → sphere formula.
// The sphere texture UV seam sits at theta=0 (lng = -180).
// "Nigeria at lng=8.6°" should appear at the front of the globe facing the camera.
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi   = (90 - lat) * (Math.PI / 180);  // polar angle: 0 = north pole
  const theta = lng * (Math.PI / 180);         // azimuth angle matching flipped UV space

  // Standard right-hand spherical → cartesian matching Three.js flipped UV mapping
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y =  radius * Math.cos(phi);
  const z =  radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}

// ── Sub-components ────────────────────────────────────────────────────────────

interface MarkerProps {
  position: THREE.Vector3;
  label: string;
  isMain?: boolean;
  theme: 'hologram' | 'political';
}

const Marker: React.FC<MarkerProps> = ({ position, label, isMain = false, theme }) => {
  const isHologram = theme === 'hologram';
  const dotColor = isMain ? '#fbbf24' : (isHologram ? '#38bdf8' : '#00f0ff');
  const ringColor = isMain ? '#fbbf24' : (isHologram ? '#38bdf8' : '#00f0ff');
  return (
    <group position={position}>
      {/* Core dot */}
      <Sphere args={[isMain ? 0.08 : 0.045, 16, 16]}>
        <meshBasicMaterial color={dotColor} />
      </Sphere>
      {/* Pulse ring */}
      <Sphere args={[isMain ? 0.22 : 0.14, 16, 16]}>
        <meshBasicMaterial 
          color={ringColor} 
          transparent 
          opacity={isHologram ? 0.18 : 0.35} 
        />
      </Sphere>
      {/* Label — always faces camera because Html component auto-bills */}
      <Html
        occlude
        distanceFactor={9}
        position={[0, isMain ? 0.28 : 0.22, 0]}
        center
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        <span
          style={{
            fontSize: isMain ? '11px' : '9px',
            fontWeight: isMain ? 700 : 600,
            color: isMain ? '#fbbf24' : '#ffffff',
            background: isMain 
              ? 'rgba(251,191,36,0.15)' 
              : (isHologram ? 'rgba(56,189,248,0.12)' : 'rgba(15,23,42,0.92)'),
            border: `1px solid ${
              isMain 
                ? 'rgba(251,191,36,0.4)' 
                : (isHologram ? 'rgba(56,189,248,0.3)' : 'rgba(0,240,255,0.45)')
            }`,
            borderRadius: '4px',
            padding: '2px 6px',
            backdropFilter: 'blur(4px)',
            whiteSpace: 'nowrap',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            boxShadow: isHologram ? 'none' : '0 4px 12px rgba(0,0,0,0.5)',
          }}
        >
          {label}
        </span>
      </Html>
    </group>
  );
};

interface ArcProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
  theme: 'hologram' | 'political';
}

const Arc: React.FC<ArcProps> = ({ start, end, theme }) => {
  const isHologram = theme === 'hologram';
  const geometry = useMemo(() => {
    const mid = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(2 + start.distanceTo(end) * 0.35); // arch height

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return new THREE.BufferGeometry().setFromPoints(curve.getPoints(60));
  }, [start, end]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial 
        color={isHologram ? '#38bdf8' : '#00f0ff'} 
        transparent 
        opacity={isHologram ? 0.45 : 0.75} 
        linewidth={isHologram ? 1 : 2}
      />
    </line>
  );
};

// ── Globe Scene ───────────────────────────────────────────────────────────────

const RADIUS = 2;

// Nigeria is at lng ≈ +8.7°. Under standard projection with zero local sphere rotation,
// it sits near the negative X axis (angle ~188.6°). We rotate the parent group by
// -98.6° to align Nigeria perfectly at the front (+Z axis) facing the camera at load.
const GROUP_Y_OFFSET = (-98.6) * (Math.PI / 180);

const LOCATIONS = [
  { name: 'Nigeria',   lat: 9.082,   lng: 8.6753,    isMain: true  },
  { name: 'USA',       lat: 40.7128, lng: -74.006,   isMain: false },
  { name: 'UK',        lat: 51.5074, lng: -0.1278,   isMain: false },
  { name: 'Canada',    lat: 43.6532, lng: -79.3832,  isMain: false },
  { name: 'Germany',   lat: 52.52,   lng: 13.405,    isMain: false },
  { name: 'France',    lat: 48.857,  lng: 2.352,     isMain: false },
  { name: 'Japan',     lat: 35.676,  lng: 139.650,   isMain: false },
  { name: 'Singapore', lat: 1.352,   lng: 103.820,   isMain: false },
  { name: 'Australia', lat: -33.869, lng: 151.209,   isMain: false },
];

interface GlobeSceneProps {
  theme: 'hologram' | 'political';
}

const GlobeScene: React.FC<GlobeSceneProps> = ({ theme }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load textures
  const hologramTexture = useLoader(THREE.TextureLoader, '/world-map.webp');
  const politicalTexture = useLoader(THREE.TextureLoader, '/world-map-political.jpg');

  // Slow continuous auto-rotation
  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.0015;
  });

  const isHologram = theme === 'hologram';
  const activeTexture = isHologram ? hologramTexture : politicalTexture;

  const nigeriaVec = useMemo(
    () => latLngToVector3(9.082, 8.6753, RADIUS),
    []
  );

  const points = useMemo(
    () => LOCATIONS.map(loc => ({
      ...loc,
      vec: latLngToVector3(loc.lat, loc.lng, RADIUS),
    })),
    []
  );

  return (
    // Single group rotated together → texture + markers always aligned
    <group ref={groupRef} rotation={[0, GROUP_Y_OFFSET, 0]}>
      {/* Globe sphere */}
      <Sphere args={[RADIUS, 64, 64]} rotation={[0, 0, 0]}>
        <meshStandardMaterial
          map={activeTexture}
          emissive={isHologram ? '#1e3a8a' : '#0a0f1d'}
          emissiveMap={activeTexture}
          emissiveIntensity={isHologram ? 0.25 : 0.45} // bright emissive for timezone map pop
          roughness={isHologram ? 0.55 : 0.45}
          metalness={isHologram ? 0.15 : 0.1}
        />
      </Sphere>

      {/* Subtle outer atmosphere */}
      <Sphere args={[RADIUS * 1.12, 64, 64]}>
        <meshBasicMaterial 
          color={isHologram ? '#38bdf8' : '#00f0ff'} 
          transparent 
          opacity={isHologram ? 0.05 : 0.02} 
          side={THREE.BackSide} 
        />
      </Sphere>

      {/* Markers + arcs — rotate with the sphere */}
      {points.map((loc) => (
        <React.Fragment key={loc.name}>
          <Marker position={loc.vec} label={loc.name} isMain={loc.isMain} theme={theme} />
          {!loc.isMain && <Arc start={nigeriaVec} end={loc.vec} theme={theme} />}
        </React.Fragment>
      ))}
    </group>
  );
};

// ── Public export ─────────────────────────────────────────────────────────────

export const Globe: React.FC = () => {
  const [theme, setTheme] = useState<'hologram' | 'political'>('political');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    setIsMobile(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  return (
    <div className="w-full h-[320px] sm:h-[500px] md:h-[700px] relative group/globe">
      
      {/* Floating Theme Console */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20 flex gap-1.5 md:gap-2 p-1 md:p-1.5 rounded-xl md:rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl">
        <button
          onClick={() => setTheme('hologram')}
          className={`px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-mono font-bold tracking-wider uppercase rounded-lg md:rounded-xl transition-all ${
            theme === 'hologram' 
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
              : 'text-zinc-400 hover:text-white border border-transparent'
          }`}
        >
          Hologram
        </button>
        <button
          onClick={() => setTheme('political')}
          className={`px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-mono font-bold tracking-wider uppercase rounded-lg md:rounded-xl transition-all ${
            theme === 'political' 
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
              : 'text-zinc-400 hover:text-white border border-transparent'
          }`}
        >
          Political Map
        </button>
      </div>

      {isMobile ? (
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-[#0a0f1e]/40 rounded-[2.5rem] border border-white/5 p-6 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.06),transparent_70%)] pointer-events-none" />
          <img
            src={theme === 'hologram' ? '/world-map.webp' : '/world-map-political.jpg'}
            alt="World Map Grid"
            width={640}
            height={320}
            className="w-full h-auto object-contain max-h-[260px] sm:max-h-[400px] opacity-35 filter drop-shadow-[0_0_15px_rgba(56,189,248,0.15)] rounded-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-x-6 bottom-6 flex flex-col items-start gap-1 select-none">
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-blue-400/90 block">Nigeria HQ to Global SaaS</span>
            <p className="text-[11px] sm:text-xs font-mono text-zinc-500 tracking-wider">Timezone coordinates mapped successfully</p>
          </div>
        </div>
      ) : (
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 6], fov: 45 }}
        >
          <React.Suspense
            fallback={
              <Sphere args={[RADIUS, 32, 32]}>
                <meshBasicMaterial color="#0d1b3e" wireframe />
              </Sphere>
            }
          >
            <ambientLight intensity={theme === 'hologram' ? 0.6 : 0.85} />
            <pointLight position={[8, 8, 8]} intensity={theme === 'hologram' ? 1.8 : 2.2} />
            <pointLight position={[-8, -8, -6]} intensity={0.4} color={theme === 'hologram' ? '#38bdf8' : '#fbbf24'} />

            <GlobeScene theme={theme} />

            {/* User can drag to spin */}
            <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />

            <Stars radius={100} depth={50} count={1800} factor={4} saturation={0} fade speed={1} />
          </React.Suspense>
        </Canvas>
      )}

      {/* Top/bottom fade into page background */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0B0F19] via-transparent to-[#0B0F19]" />
    </div>
  );
};
