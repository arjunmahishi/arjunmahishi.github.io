import Link from 'next/link'

export default function Nav() {
  const navItems = [
    { title: 'About', href: '/about' },
    { title: 'Projects', href: '/projects' },
    { title: 'Blog', href: '/posts' },
    { title: 'Guitar Tabs', href: '/tabs' },
    { title: 'Maps', href: '/maps' },
  ]


  return (
    <div>
      <h1 className="flex justify-center text-4xl font-bold mb-4 mt-10">
        <Link href="/">ಅರ್ಜುನ್ ಮಹಿಷಿ</Link>
      </h1>
      <nav className="flex justify-center">
        <ul className="flex gap-5">
          {navItems.map((item, i) => {
            return <li key={i}>
              <Link className="underline underline-offset-4 decoration-2" href={item.href}>{item.title}</Link>
            </li>
          })}
        </ul>
      </nav>
    </div>
  )
}
