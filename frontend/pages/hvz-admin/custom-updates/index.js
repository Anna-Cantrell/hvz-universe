import AdminSidebar from '../../../components/admin/AdminSidebar';
import AdminUpdates from '../../../components/admin/AdminUpdates';
import { PageContainer } from '../../../components/styles/GeneralStyles';
import PleaseSignIn from '../../../components/PleaseSignIn';

const CustomUpdates = props => (
  <PleaseSignIn>
    <PageContainer className="admin-page">
      <AdminSidebar />
      <main>
        <AdminUpdates />
      </main>
    </PageContainer>
  </PleaseSignIn>
);

export default CustomUpdates;
