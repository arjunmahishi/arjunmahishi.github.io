import Link from 'next/link'

export default function Nav() {
  const navItems = [
    { title: 'About', href: '/about' },
    { title: 'Projects', href: '/projects' },
    { title: 'Blog', href: '/posts' },
    { title: 'Vim-Adventures', href: '/vim-adventures' },
    { title: 'Maps', href: '/maps' },
  ]


  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-4xl font-bold mb-4">
        <Link className="underline decoration-2 underline-offset-4" href="/">ಅರ್ಜುನ್ ಮಹಿಷಿ</Link>
      </h1>
      <nav>
        <ul className="flex flex-wrap justify-center gap-2">
          {navItems.map((item, i) => {
            return <li className="mx-2 inline-block align-text-bottom" key={i}>
              <Link className="underline underline-offset-4 decoration-2" href={item.href}>{item.title}</Link>
            </li>
          })}
        </ul>
      </nav>
    </div>
  )
}
