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

      <div className="prose lg:max-w-3xl lg:px-0 px-8 my-4 sm:my-8">
        <h1 className="text-4xl font-bold">{data.title}</h1>
      </div>

      <article
        className="prose lg:max-w-3xl lg:px-0 px-8 mb-4 sm:mb-8 leading-relaxed text-gray-800"
        dangerouslySetInnerHTML={{ __html: data.contentHTML }} />
    </Layout>
  )
}
