import Layout from '../components/layout';
import Nav from '../components/nav';
import PostList from '../components/post-list';
import RssLink from '../components/rss-link';

import { getAllPosts } from '../lib/posts';
import { getMDContent } from '../lib/home';

export async function getStaticProps() {
  const allPostsData = getAllPosts();
  const bio = await getMDContent('home.md');
  return {
    props: {
      allPostsData,
      bio,
    },
  };
}

export default function Home({ allPostsData, bio }) {
  return (
    <Layout>
      <Nav home />

      <main id="main-content" className="container-main" tabIndex={-1}>
        <section
          aria-label="About me"
          className="prose mb-12"
          dangerouslySetInnerHTML={{ __html: bio.contentHTML }} />
        <section id="writing" aria-labelledby="writing-heading">
          <div className="section-heading">
            <div className="flex items-center gap-3">
              <h2 id="writing-heading">Writing</h2>
              <RssLink />
            </div>
            <span>Software &amp; other interests</span>
          </div>
          <PostList posts={allPostsData} />
        </section>
      </main>
    </Layout>
  )
}
