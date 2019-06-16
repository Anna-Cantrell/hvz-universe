
import UpdatePlayer from '../components/UpdatePlayer';

const updatePlayer = props => (
  <div>
    <UpdatePlayer id={props.query.id} />
  </div>
);

export default updatePlayer;
