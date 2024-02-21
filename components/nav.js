import Link from 'next/link'

export default function Nav() {
  const navItems = [
    { title: 'About', href: '/about' },
    { title: 'Projects', href: '/projects' },
    { title: 'Blog', href: '/posts' },
    { title: 'Vim-Adventures', href: '/vim-adventures' },
    { title: 'Trekking map', href: '/maps' },
  ]


  return (
    <nav className="flex flex-col lg:flex-row lg:w-2/3 place-items-center lg:place-items-start">
      <div className="text-2xl">
        <Link className="underline decoration-2 underline-offset-4" href="/">ಅರ್ಜುನ್ ಮಹಿಷಿ</Link>
      </div>
      <div className="flex grow justify-end mt-2 lg:mt-0">
        <ul className="p-1">
          {navItems.map((item, i) => {
            return <li className="mx-2 inline-block align-text-bottom" key={i}>
              <Link className="underline underline-offset-4 decoration-2" href={item.href}>{item.title}</Link>
            </li>
          })}
        </ul>
      </div>
    </nav>
  )
}
