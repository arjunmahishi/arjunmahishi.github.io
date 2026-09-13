import Image from 'next/image'
import Link from 'next/link'

export default function Social({ link, type, size = 32 }) {
  return (
    <Link className="flex" href={link}>
      <Image src={`/img/${type}.svg`}
        alt={type}
        width={size} height={size} />
    </Link>
  )
}