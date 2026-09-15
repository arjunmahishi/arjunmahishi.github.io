import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const navItems = [
  { title: 'Writing', href: '/#writing', section: '/posts' },
  { title: 'About', href: '/about', section: '/about' },
  { title: 'Guitar Tabs', href: '/tabs', section: '/tabs' },
  { title: 'Maps', href: '/maps', section: '/maps' },
]

export default function Nav({ home = false }) {
  const router = useRouter();
  const pathname = router.asPath.split(/[?#]/)[0];
  const name = <Link href="/" className="site-name" lang="kn">ಅರ್ಜುನ್ ಮಹಿಷಿ</Link>;

  return (
    <header className={`container-main site-header${home ? ' site-header-home' : ''}`}>
      {home ? <h1>{name}</h1> : name}
      <nav aria-label="Main navigation">
        <ul>
          {navItems.map((item) => {
            const active = (home && item.href === '/#writing')
              || pathname === item.section
              || pathname.startsWith(`${item.section}/`);

            return (
              <li key={item.href}>
                <Link href={item.href} aria-current={active ? 'location' : undefined}>
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      {home && (
        <Image src="/img/dp.webp"
          alt="Illustrated portrait of Arjun Mahishi at his laptop"
          width={180} height={150}
          priority
          className="home-portrait" />
      )}
    </header>
  )
}
