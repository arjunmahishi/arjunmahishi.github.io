import Link from "next/link";
import Head from "next/head";
import Script from 'next/script'
import { useRouter } from 'next/router';
import { useEffect } from "react";

import * as gtag from "../lib/gtag"

export default function Layout({ children, meta }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  if (meta === undefined) meta = {}

  return (
    <>
      <Head>
        <title>{meta.title ? `${meta.title} | Arjun Mahishi` : "Arjun Mahishi"}</title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="description" content={meta.description || "Arjun Mahishi's personal website"} />
        <meta property="og:title" content={meta.title || "Arjun Mahishi"} />
        <meta property="og:description" content={meta.description || ""} />
        <meta property="og:image" content={meta.image || "/img/dp.jpg"} />
        <meta property="og:url" content={meta.url || "https://arjunmahishi.me"} />
        <meta property="og:type" content="blog" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@arjunmahishi" />
        <meta name="twitter:creator" content="@arjunmahishi" />
        <meta name="twitter:title" content={meta.title || "Arjun Mahishi"} />
        <meta name="twitter:description" content={meta.description || ""} />
        <meta name="twitter:image" content={meta.image || "/img/dp.jpg"} />

        <link
          rel="preload"
          href="https://unpkg.com/prismjs@0.0.1/themes/prism-okaidia.css"
          as="script" />

        <link href="/gruvbox.css" rel="stylesheet" />
      </Head>

      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-857DV9833V" />
      <Script
        id='google-analytics'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-857DV9833V', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      {children}

      <footer className="text-center text-gray-500 text-sm mt-5 pb-2">
        Built from scratch with {" "}
        <Link href="https://nextjs.org/" className="underline decoration-dashed underline-offset-4 decoration-2">Next.js</Link> and {" "}
        <Link href="https://tailwindcss.com/" className="underline decoration-dashed underline-offset-4 decoration-2">Tailwind CSS</Link>
      </footer>
    </>
  )
}
