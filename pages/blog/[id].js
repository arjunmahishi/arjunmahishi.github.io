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
  console.log("debug", postData)

  return (
    <div>
      <h1>{postData.title}</h1>
      <i>{postData.date}</i><br />
      <b>tags</b>
      <ul>
        {postData.tags.map((tag, i) => (
          <li key={i}>{tag}</li>
        ))}
      </ul>

      <div dangerouslySetInnerHTML={{ __html: postData.contentHTML }} />
    </div>
  );
}
