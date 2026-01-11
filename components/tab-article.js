import Layout from "./layout";
import Nav from "./nav";

export default function TabArticle({ postData }) {
  const hasVideo = postData.videoUrl && postData.videoUrl.length > 0;
  const svgPaths = postData.svgPaths || [];
  const hasSvgs = svgPaths.length > 0;

  const getYouTubeEmbedUrl = (url) => {
    if (url.includes('/embed/')) {
      return url;
    }
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  };

  return (
    <Layout meta={postData}>
      <Nav />

      {!postData.hideTitle && (
        <div className="flex mt-10 mb-7 justify-center">
          <h1 className="text-4xl font-bold">{postData.title}</h1>
        </div>
      )}

      <article
        className="prose lg:max-w-3xl lg:px-0 px-8 mb-8 leading-relaxed text-gray-800"
        dangerouslySetInnerHTML={{ __html: postData.contentHTML }}
      />

      {hasVideo && (
        <div className="lg:max-w-3xl lg:px-0 px-8 mb-8">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={getYouTubeEmbedUrl(postData.videoUrl)}
              title={postData.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {hasSvgs && (
        <div className="lg:max-w-3xl lg:px-0 px-8 mb-8 space-y-4">
          {svgPaths.map((svgPath, index) => (
            <img
              key={index}
              src={svgPath}
              alt={`${postData.title} - Page ${index + 1}`}
              className="w-full"
            />
          ))}
        </div>
      )}
    </Layout>
  );
}
