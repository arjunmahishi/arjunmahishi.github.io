import Link from 'next/link'

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function formatDate(date) {
  const [year, month, day] = date.split("-")
  return `${MONTHS[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`
}

export default function PostList({ posts }) {
  return (
    <div className="container-main pb-16">
      {posts.map((post, i) => {
        const url = post.url || `/posts/${post.id}`

        return (
          <section
            key={post.id}
            className="group relative my-10 first-of-type:mt-0 last-of-type:mb-0">

            {i === 0 && (
              <span className="mb-1 inline-block text-xs tracking-wider text-accent">Latest</span>
            )}

            <h2 className="my-0 text-xl lg:text-2xl font-medium transition-colors group-hover:text-accent">
              {post.title}
              {post.draft ? " [DRAFT]" : ""}
              {post.external_post && <span className="text-gray-400"> ↗</span>}
            </h2>

            <time className="text-xs text-gray-400">
              {formatDate(post.date)}
              {post.readTime && <span> · {post.readTime}</span>}
            </time>

            <Link href={url} className="absolute inset-0 text-[0px]" aria-label={post.title}>
              {post.title}
            </Link>
          </section>
        )
      })}
    </div>
  )
}