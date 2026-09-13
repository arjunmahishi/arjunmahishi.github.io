import Layout from '../components/layout';
import Nav from '../components/nav';
import PostList from '../components/post-list';

import { getAllPosts } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getAllPosts();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout>
      <Nav home />

      <PostList posts={allPostsData} />

    </Layout>
  )
}