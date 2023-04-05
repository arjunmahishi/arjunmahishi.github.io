import Link from 'next/link'
import Image from 'next/image'

import Layout from '../components/layout';
import Nav from '../components/nav';
import Social from '../components/social';
import { getMDContent } from '../lib/home';

export async function getStaticProps() {
  const data = await getMDContent(`home.md`);

  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  return (
    <Layout>
      <Nav />

      <div className="flex flex-col items-center justify-center py-2 mt-10">
        <Image src="/img/dp.jpg" 
          alt="Arjun Mahishi" 
          width={400} height={400}
          className="rounded-full" />
      </div>

      <div className="flex flex-col lg:flex-row justify-center lg:mt-10 items-center">
        <Social
          className="lg:p-2"
          link="https://www.linkedin.com/in/arjun-mahishi-b18968126/"
          type="linkedin"
          text="Arjun Mahishi"/>

        <Social
          className="lg:p-2"
          link="https://twitter.com/arjunmahishi"
          type="twitter"
          text="@arjunmahishi" />

        <Social
          className="lg:p-2"
          link="https://github.com/arjunmahishi"
          type="github"
          text="arjunmahishi"/>

        <Social
          className="lg:p-2"
          link="https://www.youtube.com/@arjunmahishi.mp3"
          type="youtube"
          text="@arjunmahishi.mp3"/>
      </div>

    </Layout>
  )
}
