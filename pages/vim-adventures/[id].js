import Layout from "../../components/layout";
import Nav from "../../components/nav";

import { getPostData, getAllPostIds } from "../../lib/posts";

export async function getStaticPaths() {
  const paths = getAllPostIds('vim-adventures');

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id, 'vim-adventures');

  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout meta={postData}>
      <Nav />

      <article
          className="prose lg:max-w-3xl lg:prose-lg px-8 m-auto my-4 sm:my-16 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: postData.contentHTML }} />
    </Layout>
  );
}
