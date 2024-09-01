import Layout from "./layout";
import Nav from "./nav";

export default function Article({ postData }) {
  const showImage = postData.image && postData.image.length > 0;

  return (
    <Layout meta={postData}>
      <Nav />

      <div className="prose lg:max-w-3xl px-8 m-auto my-4 sm:my-8">
        <h1 className="text-4xl font-bold">{postData.title}</h1>
      </div>

      <img
        src={postData.image} alt={postData.title} className="lg:max-w-3xl rounded-xl mb-4"
        style={{ display: showImage ? "block" : "none" }} />

      <article
        className="prose lg:max-w-3xl px-8 m-auto mb-4 sm:mb-8 leading-relaxed text-gray-800"
        dangerouslySetInnerHTML={{ __html: postData.contentHTML }} />

    </Layout>
  );
}
