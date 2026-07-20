import Image from 'next/image'

export default function Logo({ height = 32 }: { height?: number }) {
  return (
    <div className="relative" style={{ height, width: height * 4.2 }}>
      <Image
        src="/images/voya-logo.png"
        alt="Voya"
        fill
        sizes={`${height * 4.2}px`}
        className="object-contain object-left"
      />
    </div>
  )
}