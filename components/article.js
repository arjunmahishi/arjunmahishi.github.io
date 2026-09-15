import Layout from "./layout";
import Nav from "./nav";
import AudioPlayer from "./audio-player";

export default function Article({ postData }) {
  const showImage = postData.image && postData.image.length > 0;
  const showDateAndReadTime = postData.date || postData.readTime;

  return (
    <Layout meta={postData}>
      <Nav />

      <main id="main-content" className="container-main page-content" tabIndex={-1}>
        {(postData.title || showDateAndReadTime) && (
          <header className="page-heading">
            {postData.title && <h1 className="page-title">{postData.title}</h1>}
            {showDateAndReadTime && (
              <div className="article-meta">
                {postData.date && <time dateTime={postData.date}>{postData.date}</time>}
                {postData.readTime && <span>{postData.readTime}</span>}
              </div>
            )}
          </header>
        )}

        {postData.audio && <AudioPlayer src={postData.audio} />}

        {showImage && (
          <img src={postData.image} alt={postData.title} className="article-cover" />
        )}

        <article
          className="prose"
          dangerouslySetInnerHTML={{ __html: postData.contentHTML }} />
      </main>

    </Layout>
  );
}
