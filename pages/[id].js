import Layout from '../components/layout';
import Nav from '../components/nav';
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
  return (
    <Layout>
      <Nav />

      <article
          className="prose lg:max-w-2xl lg:prose-lg px-8 m-auto my-4 sm:my-16 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: data.contentHTML }} />
    </Layout>
  )
}
