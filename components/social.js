import Image from 'next/image'
import Link from 'next/link'

export default function Social({ link, type, text, className }) {
  let width = 32;
  let height = 32;

  if (type === "linkedin") {
    width = 30;
    height = 30;
  }

  return (
    <Link
      className={`flex flex-row underline decoration-dashed underline-offset-4 decoration-2 ${className || ""}`}
      href={link}>
      <Image src={`/img/${type}.svg`}
        alt={type}
        width={width} height={height} />
      {text}
    </Link>
  )
}
