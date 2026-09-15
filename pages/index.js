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

      <main id="main-content" className="container-main" tabIndex={-1}>
        <section id="writing" aria-labelledby="writing-heading">
          <div className="section-heading">
            <h2 id="writing-heading">Writing</h2>
            <span>Software &amp; other interests</span>
          </div>
          <PostList posts={allPostsData} />
        </section>
      </main>
    </Layout>
  )
}
