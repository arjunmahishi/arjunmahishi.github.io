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
    <div className="flex flex-col lg:px-0 px-8 ">
      <h1 className="text-4xl font-bold mb-4 lg:mt-16 mt-10">
        <Link className="decoration-2" href="/">ಅರ್ಜುನ್ ಮಹಿಷಿ</Link>
      </h1>
      <nav>
        <ul className="flex flex-wrap gap-2">
          {navItems.map((item, i) => {
            return <li className="mr-4 inline-block align-text-bottom" key={i}>
              <Link className="underline underline-offset-4 decoration-2" href={item.href}>{item.title}</Link>
            </li>
          })}
        </ul>
      </nav>
    </div>
  )
}
