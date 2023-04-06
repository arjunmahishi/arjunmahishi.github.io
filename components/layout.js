import Link from "next/link";
import Head from "next/head";

export default function Layout({ children, meta }) {
  if (meta === undefined) meta = {}

  return (
    <>
      <Head>
        <title>{meta.title ? `${meta.title} | Arjun Mahishi` : "Arjun Mahishi"}</title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="description" content={meta.description || "Arjun Mahishi's personal website"} />

        <link
          rel="preload"
          href="https://unpkg.com/prismjs@0.0.1/themes/prism-okaidia.css"
          as="script" />

        <link href="/gruvbox.css" rel="stylesheet" />
      </Head>

      <div className="grid place-items-center">{children}</div>

      <footer className="text-center text-gray-500 text-sm mt-5 pb-2">
        Built from scratch with {" "}
        <Link href="https://nextjs.org/" className="underline decoration-dashed underline-offset-4 decoration-2">Next.js</Link> and {" "}
        <Link href="https://tailwindcss.com/" className="underline decoration-dashed underline-offset-4 decoration-2">Tailwind CSS</Link>
      </footer>
    </>
  )
}
