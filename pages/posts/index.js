import Layout from '../../components/layout';
import Nav from '../../components/nav';
import Listing from '../../components/listing';

import { getAllPosts } from '../../lib/posts';

export async function getStaticProps() {
  const allPostsData = getAllPosts();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function BlogIndex({ allPostsData }) {
  return (
    <Layout meta={{ title: "Blog" }}>
      <Nav />

      <Listing data={allPostsData} title={"Blog Posts"} urlPrefix="posts"/>
    </Layout>
  );
}
