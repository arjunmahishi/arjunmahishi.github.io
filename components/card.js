// import { useEffect, useState } from 'react';
// import { mdToHTML } from '../lib/mdAdaptor'
import Link from 'next/link'


export default function Listing({ data, title }) {
  data.forEach((item) => {
    console.log(item)
  })

  return (
    <div className="place-items-left w-full lg:w-1/2 px-3 lg:px-0 mt-20">
      <h1 className="text-2xl lg:text-4xl font-bold">{title}</h1>

      <table class="table-auto w-full">
        <tbody>
          {data.map((item, i) => {
            return (
              <tr className="h-14 border-b border-collapse" key={i}>
                <td>
                <Link href={`/posts/${item.id}`} className="underline decoration-dashed underline-offset-4 decoration-2">
                  <h2 className="text-md lg:text-xl">{item.title}</h2>
                </Link>
                </td>
                <td className="flex flex-col lg:flex-row lg:mt-4">
                  <span className="flex flex-grow">{item.date}</span>
                  <span className="flex flex-grow">5 min</span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
