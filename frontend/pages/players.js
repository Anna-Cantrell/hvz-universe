import PlayerList from '../components/PlayerList';
import Sidebar from '../components/Sidebar';
import {PageContainer} from '../components/styles/GeneralStyles';
import PleaseSignIn from '../components/PleaseSignIn';

const Players = props => (
  <PleaseSignIn>
    <PageContainer>
      <Sidebar />
      <PlayerList page={parseFloat(props.query.page) || 1} />
    </PageContainer>
  </PleaseSignIn>
);

export default Players;
