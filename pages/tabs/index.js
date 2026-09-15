import Layout from '../../components/layout';
import Nav from '../../components/nav';
import Listing from '../../components/listing';

import { getAllPosts } from '../../lib/posts';

export async function getStaticProps() {
  const allPostsData = getAllPosts('tabs');
  return {
    props: {
      allPostsData,
    },
  };
}

export default function TabsIndex({ allPostsData }) {
  return (
    <Layout meta={{ title: "Guitar Tabs" }}>
      <Nav />

      <Listing
        data={allPostsData}
        title={"Guitar Tabs"}
        description="Songs I've worked out on guitar, written down."
        urlPrefix="tabs" />
    </Layout>
  );
}
