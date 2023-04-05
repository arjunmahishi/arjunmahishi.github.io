import Image from 'next/image'

import Layout from '../components/layout';
import Nav from '../components/nav';
import Social from '../components/social';

export default function Home() {
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
