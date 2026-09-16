Handmade using [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com)

## RSS

The feed includes published posts and external posts, with excerpts linking to the
full articles. After deployment, the feed URL is https://arjunmahishi.com/feed.xml.

`npm run build` generates `public/feed.xml` before running Next.js, so Cloudflare
builds include an updated feed automatically. The generated file is gitignored.

For local development, run `npm run feed` to generate the feed without building.

