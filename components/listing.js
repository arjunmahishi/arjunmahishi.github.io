import Link from 'next/link'

export default function Listing({ data, urlPrefix, title }) {
  return (
    <div className="place-items-left lg:w-1/2 px-3 lg:px-0 mt-10 lg:mt-20">

      <div className="flex flex-row">
        <h1 className="text-2xl lg:text-4xl font-bold">{title}</h1>
      </div>

      <ul className="list-disc mt-4 lg:mt-8">
        {data.map((item, i) => {
          const url = item.url ? item.url : `/${urlPrefix}/${item.id}`

          return (
            <li className="h-14 flex flex-row" key={i}>
              <div className="flex flex-row flex-grow">
                <Link href={url} className="underline decoration-dashed underline-offset-4 decoration-2">
                  <h2 className="text-md lg:text-xl">{item.title}</h2>
                </Link>
              </div>

              <span className="flex hidden lg:block lg:mt-1">{item.date}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
