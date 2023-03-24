// import { getSortedPostsData } from '../lib/posts';
import Head from 'next/head';
import Layout from '../components/layout';
import { getHomeContent } from '../lib/home';

export async function getStaticProps() {
  const data = await getHomeContent();

  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  return (
    <Layout>
      <Head>
        <title>Arjun Mahishi</title>
      </Head>

      <article
          className="prose lg:max-w-4xl lg:prose-lg px-8 m-auto my-4 sm:my-16 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: data.contentHTML }} />
    </Layout>
  )
}
