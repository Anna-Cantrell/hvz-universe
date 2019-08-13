
import UpdatePlayer from '../components/UpdatePlayer';
import User from '../components/User';

const updatePlayer = props => (
  <User>
    {({ data: { me } }) => {
      if(!me) return <p>You have to be logged in for that!</p>;
      return <UpdatePlayer me={me} id={props.query.id} />;
    }}
  </User>
);

export default updatePlayer;
