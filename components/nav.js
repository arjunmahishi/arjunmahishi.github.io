import Image from 'next/image'
import Link from 'next/link'

import Social from './social'
import { socialLinks } from '../lib/social-links'

const navItems = [
  { title: 'Blog', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Guitar Tabs', href: '/tabs' },
  { title: 'Maps', href: '/maps' },
]

function NavLinks() {
  return (
    <ul className="flex gap-6">
      {navItems.map((item, i) => {
        return <li key={i}>
          <Link className="link font-medium" href={item.href}>{item.title}</Link>
        </li>
      })}
    </ul>
  )
}

export default function Nav({ home = false }) {
  // Stacked hero layout for the landing page
  if (home) {
    return (
      <div className="container-main mt-16 mb-16 flex flex-col items-center">
        <div className="flex items-center gap-6">
          <Image src="/img/dp.webp"
            alt="Arjun Mahishi"
            width={160} height={133}
            className="h-32 lg:h-40 w-auto rounded-xl" />
          <h1 className="text-4xl lg:text-5xl font-medium">
            <Link href="/">ಅರ್ಜುನ್ ಮಹಿಷಿ</Link>
          </h1>
        </div>

        <ul className="mt-8 flex items-center gap-4">
          {socialLinks.map((sobj) => {
            return (
              <li key={sobj.type}>
                <Social link={sobj.link} type={sobj.type} size={28} />
              </li>
            )
          })}
        </ul>

        <nav className="mt-6">
          <NavLinks />
        </nav>
      </div>
    )
  }

  // Compact header row for all other pages
  return (
    <header className="container-main flex h-24 flex-wrap items-center gap-x-8 gap-y-3">
      <h1 className="text-2xl font-medium">
        <Link href="/">ಅರ್ಜುನ್ ಮಹಿಷಿ</Link>
      </h1>

      <nav className="ml-auto">
        <NavLinks />
      </nav>
    </header>
  )
}