import AdminSidebar from '../../../components/admin/AdminSidebar';
import AdminPages from '../../../components/admin/AdminPages';
import { PageContainer } from '../../../components/styles/GeneralStyles';
import PleaseSignIn from '../../../components/PleaseSignIn';

const CustomUpdates = props => (
  <PleaseSignIn page="admin">
    <PageContainer className="admin-page">
      <AdminSidebar />
      <main>
        <AdminPages />
      </main>
    </PageContainer>
  </PleaseSignIn>
);

export default CustomUpdates;
