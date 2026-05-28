"use client"

import { EffectComposer, Bloom } from "@react-three/postprocessing"

export function Effects() {
  return (
    <EffectComposer>
      <Bloom intensity={1.5} luminanceThreshold={0.2} />
    </EffectComposer>
  )
}
