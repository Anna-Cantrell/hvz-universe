import Updates from '../components/Updates';
import Sidebar from '../components/Sidebar';
import {PageContainer} from '../components/styles/GeneralStyles';
import PleaseSignIn from '../components/PleaseSignIn';


const Home = props => (
  <PleaseSignIn>
    <PageContainer>
      <Sidebar />
      <Updates />
    </PageContainer>
  </PleaseSignIn>
);

export default Home;
