"use client"

import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { CrystalField } from "@/components/CrystalField"
import { Effects } from "@/components/Effects"
import { OrbitControls } from "@react-three/drei"
import { GlowParticles } from "@/components/GlowParticles"

export default function Page() {
  return (
    <div className="w-screen h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <color attach="background" args={["#000"]} />

        {/* HDRI環境光 */}
        <Environment preset="city" />

        {/* クリスタル群 */}
        <CrystalField />

        <GlowParticles />

        {/* ポストエフェクト */}
        <Effects />
        <OrbitControls minDistance={5} maxDistance={40} />
      </Canvas>
    </div>
  )
}
