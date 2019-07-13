import Permissions from '../../../components/admin/Permissions';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import { PageContainer } from '../../../components/styles/GeneralStyles';
import PleaseSignIn from '../../../components/PleaseSignIn';

const PermissionsPage = props => (
  <PleaseSignIn>
    <PageContainer>
      <AdminSidebar />
      <div>
          <Permissions />
      </div>
    </PageContainer>
  </PleaseSignIn>
);

export default PermissionsPage;
