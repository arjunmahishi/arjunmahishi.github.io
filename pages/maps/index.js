import Nav from '../../components/nav';
import Layout from '../../components/layout';

const enableProfile = false;

export default function BlogIndex({}) {
  let profileQuery = enableProfile ? `` : `&noprof=1`;

  return (
    <Layout meta={{ title: "Maps" }}>
      <Nav />

      <div className="flex flex-col items-center justify-center mt-20">
        <iframe
          src={`https://www.google.com/maps/d/embed?mid=1Gm7xu7Q9hJXPW7yO82KXDHkqPwIBggo&ehbc=2E312F${profileQuery}`}
          width="640"
          height="480">
        </iframe>
      </div>
    </Layout>
  );
}
