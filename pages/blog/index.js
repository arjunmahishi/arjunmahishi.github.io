import Link from 'next/link';
import Layout from '../../components/layout';

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
      <div className="prose lg:prose-xl px-8 m-auto my-4 sm:my-16 prose-img:rounded-xl">
     
        {allPostsData.map((data, i) => {
          return (
            <div key={i} className="prose lg:prose-xl px-8 m-auto my-4 sm:my-16">
              <Link href={`/blog/${data.id}`}>
                <h2 className="text-2xl font-bold">{data.title}</h2>
              </Link>
              <p className="text-sm">{data.date}</p>
            </div>
          );
        })}
      
      </div>
    </Layout>
  );
}
