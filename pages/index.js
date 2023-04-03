import Layout from '../components/layout';
import Nav from '../components/nav';
import { getMDContent } from '../lib/home';

export async function getStaticProps() {
  const data = await getMDContent(`home.md`);

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
        className="prose lg:max-w-3xl lg:prose-lg px-8 m-auto my-4 sm:my-16 prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: data.contentHTML }} />
    </Layout>
  )
}
