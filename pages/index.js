import Image from 'next/image'
import Link from 'next/link'

import Layout from '../components/layout';
import Nav from '../components/nav';
import Social from '../components/social';

import { getAllPosts } from '../lib/posts';

export async function getStaticProps() {
  const socialLinks = [
    {
      link: "https://www.linkedin.com/in/arjun-mahishi-b18968126/",
      type: "linkedin",
      text: "Arjun Mahishi"
    },
    {
      link: "https://twitter.com/arjunmahishi",
      type: "twitter",
      text: "@arjunmahishi"
    },
    {
      link: "https://github.com/arjunmahishi",
      type: "github",
      text: "arjunmahishi"
    },
    {
      link: "https://www.youtube.com/@arjunmahishi.mp3",
      type: "youtube",
      text: "@arjunmahishi.mp3"
    }
  ]

  const allPostsData = getAllPosts();
  return {
    props: {
      allPostsData,
      socialLinks,
    },
  };
}

export default function Home({ allPostsData, socialLinks }) {
  const latestPostURL = allPostsData[0].url ? allPostsData[0].url : `/posts/${allPostsData[0].id}`

  return (
    <Layout>
      <Nav />

      <div className="flex justify-center py-2 mt-10">
        <Image src="/img/dp.jpg"
          alt="Arjun Mahishi"
          width={400} height={400}
          className="rounded-full" />
      </div>

      <span className="flex flex-col items-center text-gray-500 text-lg mt-5">
        <Link href={latestPostURL} className="flex">
          Read my latest blog post →
        </Link>
        <Link href="https://github.com/arjunmahishi/dotfiles" className="flex">
          Checkout my .dotfiles →
        </Link>
      </span>

      <div className="flex flex-row justify-center mt-5 lg:mt-10 items-center">
        {socialLinks.map((sobj) => {
          return (
            <Social
              className="lg:p-2"
              key={sobj.type}
              link={sobj.link}
              type={sobj.type}
              text={sobj.text} />
          )
        })}
      </div>

    </Layout>
  )
}
