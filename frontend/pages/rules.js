import Sidebar from '../components/Sidebar';
import {PageContainer} from '../components/styles/GeneralStyles';
import PageContent from '../components/PageContent';
import PleaseSignIn from '../components/PleaseSignIn';

const Rules = props => (
  <PleaseSignIn>
    <PageContainer>
      <Sidebar />
      <PageContent title={"Rules"} />
    </PageContainer>
  </PleaseSignIn>
);

export default Rules;
