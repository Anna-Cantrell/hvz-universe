import Sidebar from '../components/Sidebar';
import {PageContainer} from '../components/styles/GeneralStyles';
import PageContent from '../components/PageContent';

const Calendar = props => (
  <PageContainer>
    <Sidebar />
    <PageContent title={"Calendar"} />
  </PageContainer>
);

export default Calendar;
