import AdminSidebar from '../../components/admin/AdminSidebar';
import { PageContainer } from '../../components/styles/GeneralStyles';
import PleaseSignIn from '../../components/PleaseSignIn';

const Admin = props => (
  <PleaseSignIn>
    <PageContainer className="admin-page">
      <AdminSidebar />
      <div>
        <p>💻</p>
        <p>This is the Admin page!!</p>
      </div>
    </PageContainer>
  </PleaseSignIn>
);

export default Admin;
