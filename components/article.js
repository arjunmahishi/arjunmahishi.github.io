import Layout from "./layout";
import Nav from "./nav";
import AudioPlayer from "./audio-player";

export default function Article({ postData }) {
  const showImage = postData.image && postData.image.length > 0;
  const showDateAndReadTime = postData.date || postData.readTime;

  return (
    <Layout meta={postData}>
      <Nav />

      <div className="container-main mt-10 mb-7">
        <h1 className="text-4xl font-bold text-center">{postData.title}</h1>
      </div>

      <div className="container-main flex justify-between mb-4 border-b border-dashed border-gray-200"
        style={{ display: showDateAndReadTime ? "flex" : "none" }}>
        <span className="text-gray-500">{postData.date}</span>
        <span className="text-gray-500">{postData.readTime}</span>
      </div>

      {postData.audio && (
        <div className="container-main">
          <AudioPlayer src={postData.audio} />
        </div>
      )}

      <img
        src={postData.image} alt={postData.title} className="container-main rounded-xl mb-4"
        style={{ display: showImage ? "block" : "none" }} />

      <article
        className="prose container-main mb-8 leading-relaxed mt-10"
        dangerouslySetInnerHTML={{ __html: postData.contentHTML }} />

    </Layout>
  );
}
