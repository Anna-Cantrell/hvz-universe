import CreateUpdate from '../../../components/admin/CreateUpdate';
import CreatePlayer from '../../../components/admin/CreatePlayer';
import UpdateCurrencyNameOne from '../../../components/admin/UpdateCurrencyNameOne';
import UpdateCurrencyNameTwo from '../../../components/admin/UpdateCurrencyNameTwo';
import UpdateCurrencyNameThree from '../../../components/admin/UpdateCurrencyNameThree';
import ListCurrencies from '../../../components/ListCurrencies';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import { PageContainer } from '../../../components/styles/GeneralStyles';
import PleaseSignIn from '../../../components/PleaseSignIn';

const CustomUpdates = props => (
  <PleaseSignIn>
    <PageContainer>
      <AdminSidebar />
      <div>
        <h2>Hark and behold your power</h2>
        <p>This is the development custom update page. For testing and some such nonsense"</p>
        <CreateUpdate />
        <CreatePlayer />
        <UpdateCurrencyNameOne />
        <UpdateCurrencyNameTwo />
        <UpdateCurrencyNameThree />
        <ListCurrencies />
      </div>
    </PageContainer>
  </PleaseSignIn>
);

export default CustomUpdates;
