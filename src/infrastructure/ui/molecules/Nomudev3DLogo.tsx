import React, { useMemo, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { SVGLoader } from 'three-stdlib';
import * as THREE from 'three';
import { Environment, Center } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const LogoModel = ({ url }: { url: string }) => {
    const svgData = useLoader(SVGLoader, url);
    const groupRef = useRef<THREE.Group>(null);

    const shapes = useMemo(() => {
        return svgData.paths.flatMap((path) => {
            // Filter out background shapes (heuristic: if a path covers the whole viewbox)
            // Viewbox is approx 300x420.
            // We can check if it's the very first path and is a rectangle, or check area.
            // For now, let's filter purely by large area if it looks like a background.

            const pathShapes = SVGLoader.createShapes(path);
            return pathShapes.map((shape) => {
                // Calculate area to detect background rectangle
                // Using a rough bounding box or ShapeUtils
                // SVGLoader shapes are 2D.

                // Simple visual heuristic: User likely wants the letters/logo, which are smaller.
                // Let's rely on the user report of "a square".
                // Filtering logic: Check bounds.

                return {
                    shape,
                    color: path.color,
                    index: path.userData
                };
            });
        }).filter(item => {
            // Compute bounding box of the shape
            const points = item.shape.getPoints();
            const min = { x: Infinity, y: Infinity };
            const max = { x: -Infinity, y: -Infinity };
            points.forEach(p => {
                if (p.x < min.x) min.x = p.x;
                if (p.y < min.y) min.y = p.y;
                if (p.x > max.x) max.x = p.x;
                if (p.y > max.y) max.y = p.y;
            });
            const width = max.x - min.x;
            const height = max.y - min.y;
            const area = width * height;

            // Filter out shapes that are roughly the size of the canvas/viewbox (297x419)
            // If width > 280 and height > 400, it's likely the background.
            if (width > 200 && height > 350) return false;

            return true;
        });
    }, [svgData]);

    // Continuous rotation on the Y axis
    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.8; // Slightly faster for hologram feel
        }
    });

    return (
        <group ref={groupRef}>
            <Center>
                <group scale={[0.1, -0.1, 0.1]}>
                    {shapes.map((item, i) => (
                        <mesh key={i}>
                            <extrudeGeometry
                                args={[
                                    item.shape,
                                    {
                                        depth: 5,
                                        bevelEnabled: true,
                                        bevelThickness: 1,
                                        bevelSize: 0.5,
                                    }
                                ]}
                            />
                            <meshStandardMaterial
                                color="#00e676"
                                emissive="#00e676"
                                emissiveIntensity={2}
                                toneMapped={false}
                                roughness={0.2}
                                metalness={0.9}
                                transparent={true}
                                opacity={0.9} // Slight hologram transparency
                            />
                        </mesh>
                    ))}
                </group>
            </Center>
        </group>
    );
};

const Nomudev3DLogo = () => {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 100], fov: 45 }} dpr={[1, 2]} gl={{ alpha: true }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <spotLight position={[50, 50, 50]} angle={0.15} penumbra={1} intensity={5} color="#00e676" />

                {/* We center the LogoModel in the scene, and inside LogoModel it centers its geometry and spins */}
                <Center>
                    <LogoModel url="/images/3d/nomudevLogoVector.svg" />
                </Center>

                <Environment preset="city" />
                <EffectComposer disableNormalPass>
                    <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default Nomudev3DLogo;
