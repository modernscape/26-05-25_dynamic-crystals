import Image from "next/image"

export default function ContainImage() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "black", // ここで背景を黒にする
        zIndex: -1,
      }}
    >
      <Image
        src="/dynamic-crystals.jpg"
        alt="dynamic-crystals"
        fill
        style={{
          objectFit: "cover", // 画像全体を表示し、アスペクト比を維持
        }}
        priority
      />
    </div>
  )
}
