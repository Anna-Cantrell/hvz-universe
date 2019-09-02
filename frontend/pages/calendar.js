import Sidebar from '../components/Sidebar';
import {PageContainer} from '../components/styles/GeneralStyles';
import PageContent from '../components/PageContent';
import PleaseSignIn from '../components/PleaseSignIn';

const Calendar = props => (
  <PleaseSignIn>
    <PageContainer>
      <Sidebar />
      <PageContent title={"Calendar"} />
    </PageContainer>
  </PleaseSignIn>
);

export default Calendar;
