import Layout from "./layout";
import Nav from "./nav";

export default function Article({ postData }) {
  const showImage = postData.image && postData.image.length > 0;
  const showDateAndReadTime = postData.date || postData.readTime;

  return (
    <Layout meta={postData}>
      <Nav />

      <div className="flex mt-10 mb-7 justify-center">
        <h1 className="text-4xl font-bold">{postData.title}</h1>
      </div>

      <div className="flex lg:px-0 px-8 justify-between mb-4 border-b border-dashed border-gray-300"
        style={{ display: showDateAndReadTime ? "flex" : "none" }}>
        <span>{postData.date}</span>
        <span>{postData.readTime}</span>
      </div>

      <img
        src={postData.image} alt={postData.title} className="lg:max-w-3xl rounded-xl mb-4"
        style={{ display: showImage ? "block" : "none" }} />

      <article
        className="prose lg:max-w-3xl lg:px-0 px-8 mb-4 sm:mb-8 leading-relaxed text-gray-800 mt-10"
        dangerouslySetInnerHTML={{ __html: postData.contentHTML }} />

    </Layout>
  );
}
