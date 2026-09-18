import Head from "next/head";
import Social from './social';
import RssLink from './rss-link';
import { socialLinks } from '../lib/social-links';
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
        <link rel="icon" type="image/webp" href="/img/dp.webp" />
        <link rel="alternate" type="application/rss+xml" title="Arjun Mahishi" href="/feed.xml" />

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

      <div className="site-shell">
        <a href="#main-content" className="skip-link">Skip to content</a>
        {children}

        <footer className="container-main site-footer">
          <p>Elsewhere on the internet <span aria-hidden="true">↗</span></p>
          <ul aria-label="Social links">
            <li><RssLink /></li>
            {socialLinks.map((social) => (
              <li key={social.type}>
                <Social link={social.link} type={social.type} size={20} />
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </>
  )
}
