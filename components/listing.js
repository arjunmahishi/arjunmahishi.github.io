import Link from 'next/link'

export default function Listing({ data, urlPrefix, title }) {
  return (
    <div className="container-main mt-10 lg:mt-20">

      <div className="flex flex-row">
        <h1 className="text-2xl lg:text-4xl font-bold">{title}</h1>
      </div>

      <ul className="mt-6 lg:mt-10 space-y-1">
        {data.map((item, i) => {
          const url = item.url ? item.url : `/${urlPrefix}/${item.id}`

          return (
            <li className="flex flex-row items-baseline" key={i}>
              <div className="flex flex-row flex-grow">
                <Link href={url} className="link">
                  <h2 className="text-md lg:text-lg">{item.title}{item.draft ? " [DRAFT]" : ""}</h2>
                </Link>
              </div>

              <span className="text-sm text-gray-400 shrink-0 ml-4">{item.date}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
