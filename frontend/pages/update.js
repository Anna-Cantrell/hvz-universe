import UpdatePlayer from '../components/UpdatePlayer';
import User from '../components/User';
import PleaseSignIn from '../components/PleaseSignIn';

const updatePlayer = props => (
  <PleaseSignIn>
    <User>
      {({ data: { me } }) => {
        if(!me) return <p>You have to be logged in for that!</p>;
        return <UpdatePlayer me={me} id={props.query.id} />;
      }}
    </User>
  </PleaseSignIn>
);

export default updatePlayer;
