import { getSortedPostsData } from '../lib/posts';
import Head from 'next/head';
import Layout from '../components/layout';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Arjun Mahishi</title>
      </Head>
    </Layout>
  )
}
