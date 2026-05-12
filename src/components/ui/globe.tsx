import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

// ── Coordinate Mapping ────────────────────────────────────────────────────────
// Standard equirectangular → sphere formula.
// The sphere texture UV seam sits at theta=0 (lng = -180).
// "Nigeria at lng=8.6°" should appear at the front of the globe facing the camera.
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi   = (90 - lat) * (Math.PI / 180);  // polar angle: 0 = north pole
  const theta = (lng + 180) * (Math.PI / 180); // azimuth: 0 = lng −180 (date-line)

  // Standard right-hand spherical → cartesian, matching Three.js SphereGeometry UV
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
}

const Marker: React.FC<MarkerProps> = ({ position, label, isMain = false }) => (
  <group position={position}>
    {/* Core dot */}
    <Sphere args={[isMain ? 0.08 : 0.045, 16, 16]}>
      <meshBasicMaterial color={isMain ? '#f59e0b' : '#38bdf8'} />
    </Sphere>
    {/* Pulse ring */}
    <Sphere args={[isMain ? 0.22 : 0.14, 16, 16]}>
      <meshBasicMaterial color={isMain ? '#f59e0b' : '#38bdf8'} transparent opacity={0.18} />
    </Sphere>
    {/* Label — always faces camera because Html component auto-bills */}
    <Html
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
          background: isMain ? 'rgba(251,191,36,0.12)' : 'rgba(56,189,248,0.12)',
          border: `1px solid ${isMain ? 'rgba(251,191,36,0.35)' : 'rgba(56,189,248,0.3)'}`,
          borderRadius: '4px',
          padding: '2px 6px',
          backdropFilter: 'blur(4px)',
          whiteSpace: 'nowrap',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </Html>
  </group>
);

interface ArcProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
}

const Arc: React.FC<ArcProps> = ({ start, end }) => {
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
      <lineBasicMaterial color="#38bdf8" transparent opacity={0.45} />
    </line>
  );
};

// ── Globe Scene ───────────────────────────────────────────────────────────────

const RADIUS = 2;

// Nigeria is at lng ≈ +8.7°, which maps to the hemisphere that needs to face the camera.
// After our latLng formula, Nigeria sits at roughly z < 0 (back of sphere facing +Z camera).
// We rotate the ENTIRE GROUP by Math.PI around Y so everything — texture + dots — flips
// together and Nigeria comes to the front (+Z toward camera).
const GROUP_Y_OFFSET = Math.PI; // rotates so Africa faces camera at load time

const LOCATIONS = [
  { name: 'Nigeria',   lat: 9.082,   lng: 8.6753,    isMain: true  },
  { name: 'USA',       lat: 40.7128, lng: -74.006,   isMain: false },
  { name: 'UK',        lat: 51.5074, lng: -0.1278,   isMain: false },
  { name: 'Canada',    lat: 43.6532, lng: -79.3832,  isMain: false },
  { name: 'Australia', lat: -33.869, lng: 151.209,   isMain: false },
  { name: 'Germany',   lat: 52.52,   lng: 13.405,    isMain: false },
  { name: 'France',    lat: 48.857,  lng: 2.352,     isMain: false },
  { name: 'Japan',     lat: 35.676,  lng: 139.650,   isMain: false },
  { name: 'UAE',       lat: 25.205,  lng: 55.271,    isMain: false },
  { name: 'Singapore', lat: 1.352,   lng: 103.820,   isMain: false },
];

const GlobeScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const texture  = useLoader(THREE.TextureLoader, '/world-map.webp');

  // Slow continuous auto-rotation
  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.0012;
  });

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
      {/* Globe sphere — NO separate rotation here */}
      <Sphere args={[RADIUS, 64, 64]}>
        <meshStandardMaterial
          map={texture}
          emissive="#1e3a8a"
          emissiveMap={texture}
          emissiveIntensity={0.25}   // reduced brightness
          roughness={0.55}
          metalness={0.15}
        />
      </Sphere>

      {/* Subtle outer atmosphere */}
      <Sphere args={[RADIUS * 1.12, 64, 64]}>
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.05} side={THREE.BackSide} />
      </Sphere>

      {/* Markers + arcs — inside same group, so they rotate with the sphere */}
      {points.map((loc) => (
        <React.Fragment key={loc.name}>
          <Marker position={loc.vec} label={loc.name} isMain={loc.isMain} />
          {!loc.isMain && <Arc start={nigeriaVec} end={loc.vec} />}
        </React.Fragment>
      ))}
    </group>
  );
};

// ── Public export ─────────────────────────────────────────────────────────────

export const Globe: React.FC = () => (
  <div className="w-full h-[500px] md:h-[700px] relative">
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
        <ambientLight intensity={0.6} />
        <pointLight position={[8, 8, 8]} intensity={1.8} />
        <pointLight position={[-8, -8, -6]} intensity={0.4} color="#38bdf8" />

        <GlobeScene />

        {/* User can drag to spin */}
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />

        <Stars radius={100} depth={50} count={1800} factor={4} saturation={0} fade speed={1} />
      </React.Suspense>
    </Canvas>

    {/* Top/bottom fade into page background */}
    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0B0F19] via-transparent to-[#0B0F19]" />
  </div>
);
