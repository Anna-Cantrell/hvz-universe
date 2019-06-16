import PlayerList from '../components/PlayerList';
import Sidebar from '../components/Sidebar';
import {PageContainer} from '../components/styles/GeneralStyles';

const Players = props => (
  <PageContainer>
    <Sidebar />
    <PlayerList page={parseFloat(props.query.page) || 1} />
  </PageContainer>
);

export default Players;
