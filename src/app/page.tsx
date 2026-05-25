import Image from "next/image"

export default function ResponsiveImage() {
  return (
    <div className="fullscreen-container">
      {/* スマホ用画像 */}
      <div className="mobile-only">
        <Image
          src="/dynamic-crystals_sp.jpg"
          alt="SP"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      {/* PC用画像 */}
      <div className="pc-only">
        <Image
          src="/dynamic-crystals.jpg"
          alt="PC"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
    </div>
  )
}
