import Sidebar from '../components/Sidebar';
import {PageContainer} from '../components/styles/GeneralStyles';
import PageContent from '../components/PageContent';

const Rules = props => (
  <PageContainer>
    <Sidebar />
    <PageContent title={"Rules"} />
  </PageContainer>
);

export default Rules;
