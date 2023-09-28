import Layout from "../../components/layout";
import Nav from "../../components/nav";
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
  const showImage = postData.image && postData.image.length > 0;

  return (
    <Layout meta={postData}>
      <Nav />

      <h1 className="text-4xl font-bold text-center my-8">{postData.title}</h1>

      <img
          src={postData.image} alt={postData.title} className="lg:max-w-3xl rounded-xl"
          style={{ display: showImage ? "block" : "none" }} />

      <article
          className="prose lg:max-w-2xl lg:prose-lg px-8 m-auto my-4 sm:my-16 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: postData.contentHTML }} />
    </Layout>
  );
}
