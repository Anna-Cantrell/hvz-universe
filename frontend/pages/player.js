import Sidebar from '../components/Sidebar';
import {PageContainer} from '../components/styles/GeneralStyles';
import SinglePlayerPage from '../components/SinglePlayerPage';

const Player = props => (
  <PageContainer>
    <Sidebar />
    <SinglePlayerPage username={props.query.username} />
  </PageContainer>
);

export default Player;
