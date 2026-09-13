import Link from "next/link";
import Head from "next/head";
import Script from 'next/script'
import { useRouter } from 'next/router';
import { useEffect } from "react";

import * as gtag from "../lib/gtag"
import { absoluteImageUrl } from "../lib/image"

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
        <meta property="og:image" content={absoluteImageUrl(meta.image || "/img/dp.webp")} />
        <meta property="og:url" content={meta.url || "https://arjunmahishi.me"} />
        <meta property="og:type" content="blog" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@arjunmahishi" />
        <meta name="twitter:creator" content="@arjunmahishi" />
        <meta name="twitter:title" content={meta.title || "Arjun Mahishi"} />
        <meta name="twitter:description" content={meta.description || ""} />
        <meta name="twitter:image" content={absoluteImageUrl(meta.image || "/img/dp.webp")} />

        <link
          rel="preload"
          href="https://unpkg.com/prismjs@0.0.1/themes/prism-okaidia.css"
          as="script" />
      </Head>

      {children}

      {router.pathname !== "/" && (
        <footer className="text-center text-gray-400 text-sm mt-12 pb-6">
          Get in touch:{" "}
          <a href="https://twitter.com/arjunmahishi" className="link">@arjunmahishi</a>
        </footer>
      )}
    </>
  )
}
