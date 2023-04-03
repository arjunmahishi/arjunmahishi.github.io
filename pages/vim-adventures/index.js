import Layout from '../../components/layout';
import Nav from '../../components/nav';
import Listing from '../../components/listing';

import { getAllPosts } from '../../lib/posts';

export async function getStaticProps() {
  const allPostsData = getAllPosts('vim-adventures');
  return {
    props: {
      allPostsData,
    },
  };
}

export default function BlogIndex({ allPostsData }) {
  return (
    <Layout meta={{ title: "vim-adventures" }}>
      <Nav />

      <Listing
        data={allPostsData}
        title={"Vim Adventures"}
        urlPrefix="vim-adventures" />
    </Layout>
  );
}
