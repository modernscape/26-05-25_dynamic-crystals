export function GlowParticles() {
  return (
    <>
      <mesh position={[10, 5, 0]}>
        <sphereGeometry args={[5.5, 16, 16]} />
        <meshBasicMaterial color="#ff00aa" transparent opacity={0.0} />
      </mesh>

      <mesh position={[-8, -3, 5]}>
        <sphereGeometry args={[5.4, 16, 16]} />
        <meshBasicMaterial color="#00ccff" transparent opacity={0.0} />
      </mesh>
    </>
  )
}
