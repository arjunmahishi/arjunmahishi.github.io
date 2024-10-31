import Nav from '../../components/nav';
import Layout from '../../components/layout';

const enableProfile = false;

export default function BlogIndex({ }) {
  let profileQuery = enableProfile ? `` : `&noprof=1`;

  return (
    <Layout meta={{ title: "Maps" }}>
      <Nav />

      <div id="map-holder" style={{
        marginTop: "4rem", width: "100%", height: "36rem",
      }}>
        <iframe
          src={`https://www.google.com/maps/d/embed?mid=1Gm7xu7Q9hJXPW7yO82KXDHkqPwIBggo&ehbc=2E312F${profileQuery}`}
          style={{
            position: 'relative',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0
          }} >
        </iframe>
      </div>

    </Layout>
  );
}
