import Permissions from '../../../components/admin/Permissions';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import { PageContainer } from '../../../components/styles/GeneralStyles';
import PleaseSignIn from '../../../components/PleaseSignIn';

const PermissionsPage = props => (
  <PleaseSignIn>
    <PageContainer className="admin-page">
      <AdminSidebar />
      <main>
          <Permissions />
      </main>
    </PageContainer>
  </PleaseSignIn>
);

export default PermissionsPage;
