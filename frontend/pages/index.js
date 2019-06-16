import Updates from '../components/Updates';
import Sidebar from '../components/Sidebar';
import {PageContainer} from '../components/styles/GeneralStyles';

const Home = props => (
  <PageContainer>
    <Sidebar />
    <Updates />
  </PageContainer>
);

export default Home;
