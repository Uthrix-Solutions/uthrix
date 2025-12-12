import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Environment, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface Logo3DProps {
  isDark: boolean;
}

// Subtle ambient particles
function ParticleField({ count = 30, isDark }: { count?: number; isDark: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.02;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={isDark ? "#ffffff" : "#D1001F"}
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function UthrixLogo({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Smooth floating animation
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    
    // Interactive tilt
    const mouseX = state.mouse.x * 0.5;
    const mouseY = state.mouse.y * 0.5;
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX + Math.sin(t * 0.2) * 0.1, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY, 0.05);
  });

  const { uGeometry, dotPosition, dotRadius } = useMemo(() => {
    const shape = new THREE.Shape();
    
    // REFINED GEOMETRY FOR IMAGE MATCHING
    const R = 1.1; // Outer radius
    const W = 0.75; // Chunky stroke
    const r = R - W; // 0.35 Inner radius
    
    // Height of the straight part of the left leg
    const H_LEFT = 2.4; 
    const H_GAP = 0.30; 
    const DOT_RAD = W / 2;
    
    // Align dot top with left stem top
    // Left stem top edge is H_LEFT + W/2
    // Dot Top = Dot Center + Radius. Thus Dot Center = H_LEFT
    const dotCenterY = H_LEFT;
    
    // Right stem top is below the dot and gap
    // Absarc center Y = H_LEFT - Radius - Gap - Radius = H_LEFT - W - H_GAP
    const rightStemTopY = H_LEFT - W - H_GAP;
    const rightStemCenterX = r + W/2; 

    // Draw U Shape
    // Start at top-left outer
    shape.moveTo(-R, H_LEFT);
    // Line down to tangent point
    shape.lineTo(-R, 0); 
    
    // Outer arc: Bowl shape (Bottom) - COUNTER-CLOCKWISE (PI -> 0)
    shape.absarc(0, 0, R, Math.PI, 0, false);
    
    shape.lineTo(R, rightStemTopY);
    // Right stem cap
    shape.absarc(rightStemCenterX, rightStemTopY, W/2, 0, Math.PI, false);
    
    shape.lineTo(r, 0);
    
    // Inner arc: Bowl shape (Bottom) - CLOCKWISE (0 -> PI) (Backwards for hole)
    shape.absarc(0, 0, r, 0, Math.PI, true);
    
    shape.lineTo(-r, H_LEFT);
    // Left stem cap
    shape.absarc(-(r + W/2), H_LEFT, W/2, 0, Math.PI, false);
    
    const extrudeSettings = {
      depth: 0.5, // Slightly deeper for substance
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 16, // Smoother bevels
      curveSegments: 64 // Very smooth curves
    };
    
    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    
    // Recalculate shift for perfect centering
    // MaxY = H_LEFT + W/2 = 2.775
    // MinY = -R = -1.1
    // Mid = 0.8375
    const shiftY = -0.84; 

    return { 
      uGeometry: geom, 
      dotPosition: [rightStemCenterX, dotCenterY + shiftY, 0] as [number, number, number],
      dotRadius: DOT_RAD
    };
  }, []);

  // Material Logic: Light -> Brand Red (#D1001F), Dark -> White (#FFFFFF)
  const material = new THREE.MeshPhysicalMaterial({
    color: isDark ? '#FFFFFF' : '#D1001F',
    roughness: 0.15,
    metalness: 0.1,
    transmission: 0.0,
    emissive: isDark ? '#FFFFFF' : '#8B0000', 
    emissiveIntensity: isDark ? 0.05 : 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={uGeometry} material={material} castShadow receiveShadow />
      
      <mesh position={dotPosition} castShadow receiveShadow>
        <sphereGeometry args={[dotRadius, 64, 64]} />
        <primitive object={material} attach="material" />
      </mesh>
    </group>
  );
}

function Scene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
      
      {/* Dynamic Lighting Setup */}
      <ambientLight intensity={isDark ? 0.2 : 0.5} />
      
      {/* Main Key Light */}
      <spotLight 
        position={[5, 5, 5]} 
        intensity={isDark ? 2 : 1.5} 
        angle={0.5} 
        penumbra={1} 
        castShadow 
        shadow-bias={-0.0001} 
      />
      
      {/* Fill Light */}
      <pointLight 
        position={[-5, 0, 5]} 
        intensity={isDark ? 1 : 0.5} 
        color={isDark ? "#ffffff" : "#D1001F"}
        distance={20}
      />
      
      {/* Rim/Back Light for definition */}
      <spotLight 
        position={[0, 5, -5]} 
        intensity={2} 
        color="#ffffff" 
      />

      {/* Environment for reflections */}
      <Environment preset={isDark ? "city" : "studio"} blur={0.8} />

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <UthrixLogo isDark={isDark} />
      </Float>
      
      <ParticleField isDark={isDark} />
      
      <ContactShadows 
        position={[0, -3.0, 0]} 
        opacity={0.4} 
        scale={10} 
        blur={2} 
        far={5} 
        color={isDark ? "#ffffff" : "#D1001F"}
      />
    </>
  );
}

export function Logo3D({ isDark }: Logo3DProps) {
  return (
    <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          toneMapping: THREE.ACESFilmicToneMapping, 
          toneMappingExposure: 1.2 
        }}
        style={{ background: 'transparent' }}
      >
        <Scene isDark={isDark} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI * 0.75}
        />
      </Canvas>
    </div>
  );
}
