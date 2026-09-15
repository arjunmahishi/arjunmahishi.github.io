import Nav from '../../components/nav';
import Layout from '../../components/layout';

const enableProfile = false;

export default function MapsIndex() {
  let profileQuery = enableProfile ? `` : `&noprof=1`;

  return (
    <Layout meta={{ title: "Maps" }}>
      <Nav />

      <main id="main-content" className="container-main page-content" tabIndex={-1}>
        <div className="page-heading">
          <h1 className="page-title">Maps</h1>
        </div>
        <div id="map-holder" className="map-frame">
          <iframe
            title="Arjun's map"
            src={`https://www.google.com/maps/d/embed?mid=1Gm7xu7Q9hJXPW7yO82KXDHkqPwIBggo&ehbc=2E312F${profileQuery}`}
            allowFullScreen />
        </div>
      </main>

    </Layout>
  );
}
