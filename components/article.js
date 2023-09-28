import Layout from "./layout";
import Nav from "./nav";

export default function Article({ postData }) {
  const showImage = postData.image && postData.image.length > 0;

  return (
    <Layout meta={postData}>
      <Nav />

      <div className="prose lg:max-w-2xl lg:prose-lg px-8 m-auto my-4 sm:my-16 prose-img:rounded-xl">
        <h1 className="">{postData.title}</h1>
      </div>

      <img
          src={postData.image} alt={postData.title} className="lg:max-w-3xl rounded-xl"
          style={{ display: showImage ? "block" : "none" }} />

      <article
          className="prose lg:max-w-2xl lg:prose-lg px-8 m-auto my-4 sm:my-16 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: postData.contentHTML }} />
    </Layout>
  );
}
