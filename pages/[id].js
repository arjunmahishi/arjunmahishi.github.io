import Article from "../components/article";
import { getMDContent } from '../lib/home';

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: 'about' } },
      { params: { id: 'projects' } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await getMDContent(`${params.id}.md`);

  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  return <Article postData={data} />;
}
