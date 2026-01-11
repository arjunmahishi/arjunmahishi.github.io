import { getPostData, getAllPostIds } from "../../lib/posts";
import TabArticle from "../../components/tab-article";

export async function getStaticPaths() {
  const paths = getAllPostIds('tabs');

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id, 'tabs');

  return {
    props: {
      postData,
    },
  };
}

export default function Tab({ postData }) {
  return <TabArticle postData={postData} />;
}
