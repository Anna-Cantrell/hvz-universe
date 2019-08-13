import Sidebar from '../components/Sidebar';
import {PageContainer} from '../components/styles/GeneralStyles';
import SinglePlayerPage from '../components/SinglePlayerPage';
import User from '../components/User';
import PleaseSignIn from '../components/PleaseSignIn';

const Player = props => (
  <PleaseSignIn>
    <PageContainer className="compressed">
      <Sidebar type="compressed" />
      <User>
        {({ data: { me } }) => {
          return (
            <SinglePlayerPage me={me} username={props.query.username} />
          );
        }}
      </User>
    </PageContainer>
  </PleaseSignIn>
);

export default Player;
