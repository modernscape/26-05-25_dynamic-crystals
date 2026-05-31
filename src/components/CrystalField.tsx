"use client"

import * as THREE from "three"
import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useMemo, useRef } from "react"
import { MeshTransmissionMaterial } from "@react-three/drei"

const COUNT = 300

export function CrystalField() {
  const ref = useRef<THREE.InstancedMesh>(null)

  const modelName = "crystal.glb"

  // GLTF読み込み
  const { nodes } = useGLTF("/models/" + modelName) as any
  const mesh = nodes.Crystal_low002.children[0]
  const geometry = mesh.geometry

  const mesh2 = nodes.Crystal_low002.children[0]
  const geometry2 = mesh2.geometry

  const scaleBase = 0.3

  // 各instance情報
  const BOUNDS = 40

  const data = useMemo(() => {
    return new Array(COUNT).fill(0).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * BOUNDS,
        (Math.random() - 0.5) * BOUNDS,
        (Math.random() - 0.5) * BOUNDS,
      ),

      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.03,
        (Math.random() - 0.5) * 0.03,
        (Math.random() - 0.5) * 0.03,
      ),

      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ),

      rotationVelocity: new THREE.Vector3(
        Math.random() * 0.01,
        Math.random() * 0.01,
        Math.random() * 0.01,
      ),

      scale: Math.random() * scaleBase + 0.01,
    }))
  }, [])

  // 初期matrix設定
  useEffect(() => {
    if (!ref.current) return

    const dummy = new THREE.Object3D()

    data.forEach((item, i) => {
      dummy.position.copy(item.position)
      dummy.rotation.copy(item.rotation)

      dummy.scale.setScalar(item.scale)

      dummy.updateMatrix()

      ref.current!.setMatrixAt(i, dummy.matrix)
    })

    ref.current.instanceMatrix.needsUpdate = true
  }, [data])

  // 毎フレーム更新
  useFrame(() => {
    if (!ref.current) return

    const dummy = new THREE.Object3D()

    data.forEach((item, i) => {
      // =========================
      // 位置更新
      // =========================

      item.position.add(item.velocity)

      // =========================
      // 壁反射
      // =========================

      if (item.position.x > BOUNDS / 2 || item.position.x < -BOUNDS / 2) {
        item.velocity.x *= -1
      }

      if (item.position.y > BOUNDS / 2 || item.position.y < -BOUNDS / 2) {
        item.velocity.y *= -1
      }

      if (item.position.z > BOUNDS / 2 || item.position.z < -BOUNDS / 2) {
        item.velocity.z *= -1
      }

      // =========================
      // 回転
      // =========================

      item.rotation.x += item.rotationVelocity.x
      item.rotation.y += item.rotationVelocity.y
      item.rotation.z += item.rotationVelocity.z

      // =========================
      // matrix生成
      // =========================

      dummy.position.copy(item.position)

      dummy.rotation.copy(item.rotation)

      dummy.scale.setScalar(item.scale)

      dummy.updateMatrix()

      ref.current!.setMatrixAt(i, dummy.matrix)
    })

    ref.current.instanceMatrix.needsUpdate = true
  })

  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    // <group ref={group}>
    //   <instancedMesh ref={ref} args={[geometry, undefined, COUNT]}>
    //     <meshPhysicalMaterial
    //       transparent
    //       opacity={0.35}
    //       roughness={0}
    //       metalness={0}
    //       depthWrite={false}
    //     />

    //     {/* <meshPhysicalMaterial
    //       transmission={1}
    //       roughness={0}
    //       metalness={0}
    //       thickness={1}
    //       ior={1.5}
    //       envMapIntensity={0.1}
    //       color="#ffffff"
    //     /> */}
    //   </instancedMesh>
    // </group>

    <>
      {/* <mesh position={[0, 0, -15]}>
        <boxGeometry args={[10, 10, 0.1]} />
        <meshBasicMaterial color="#222244" />
      </mesh> */}

      {/* 手前 */}
      <mesh geometry={geometry} position={[0, 0, 0]}>
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.1}
          ior={1.05}
          roughness={0}
          chromaticAberration={0.01}
        />
      </mesh>

      {/* 奥 */}
      <mesh geometry={geometry} position={[0, 0, -10]} rotation={[0, 0, 90]}>
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.1}
          ior={1.05}
          roughness={0}
          chromaticAberration={0.01}
        />
      </mesh>

      <mesh geometry={geometry} position={[10, 0, 10]} rotation={[0, 45, 0]}>
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.1}
          ior={1.05}
          roughness={0}
          chromaticAberration={0.01}
        />
      </mesh>
    </>
  )
}
