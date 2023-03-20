import Layout from "../../components/layout";

import { getPostData, getAllPostIds } from "../../lib/posts";

export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout meta={postData}>
      <article
          className="prose lg:prose-lg px-8 m-auto my-4 sm:my-16 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: postData.contentHTML }} />
    </Layout>
  );
}
