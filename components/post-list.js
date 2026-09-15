import Link from 'next/link'

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function formatDate(date) {
  const [year, month, day] = date.split("-")
  return `${MONTHS[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`
}

export default function PostList({ posts }) {
  return (
    <ol className="post-list">
      {posts.map((post, i) => {
        const url = post.url || `/posts/${post.id}`

        return (
          <li key={post.id} className={i === 0 ? 'post-list-item post-list-latest' : 'post-list-item'}>
            <Link href={url} className="post-link">
              <div className="post-copy">
                {i === 0 && <span className="latest-label">Latest entry</span>}
                <h3>
                  {post.title}
                  {post.draft ? " [DRAFT]" : ""}
                  {post.external_post && <span className="text-muted" aria-label="External post"> ↗</span>}
                </h3>
                {post.readTime && <span className="read-time">{post.readTime}</span>}
              </div>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </Link>
          </li>
        )
      })}
    </ol>
  )
}