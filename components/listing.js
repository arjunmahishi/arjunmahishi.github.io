import Link from 'next/link'

export default function Listing({ data, urlPrefix, title, description }) {
  return (
    <main id="main-content" className="container-main page-content" tabIndex={-1}>
      <div className="page-heading">
        <h1 className="page-title">{title}</h1>
        {description && <p className="page-description">{description}</p>}
      </div>

      <ul className="post-list listing">
        {data.map((item) => {
          const url = item.url ? item.url : `/${urlPrefix}/${item.id}`

          return (
            <li className="post-list-item" key={item.id}>
              <Link href={url} className="post-link">
                <h2>{item.title}{item.draft ? " [DRAFT]" : ""}</h2>
                <time dateTime={item.date}>{item.date}</time>
              </Link>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
