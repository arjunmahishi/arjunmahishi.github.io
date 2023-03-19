import Head from "next/head";

export default function Layout({ children, meta }) {
  if (meta === undefined) meta = {}

  return (
    <>
      <Head>
        <title>{`${meta.title} | Arjun Mahishi` || "Arjun Mahishi"}</title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="description" content={meta.description || "Arjun Mahishi's personal website"} />

        <link
          rel="preload"
          href="https://unpkg.com/prismjs@0.0.1/themes/prism-okaidia.css"
          as="script" />

        <link href="/gruvbox.css" rel="stylesheet" />
      </Head>

      <div className="grid place-items-center">{children}</div>
    </>
  )
}
