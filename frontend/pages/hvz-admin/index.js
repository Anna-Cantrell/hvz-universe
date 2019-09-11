import AdminSidebar from '../../components/admin/AdminSidebar';
import { PageContainer } from '../../components/styles/GeneralStyles';
import PleaseSignIn from '../../components/PleaseSignIn';

const Admin = props => (
  <PleaseSignIn page="admin">
    <PageContainer className="admin-page">
      <AdminSidebar />
      <main>
        <p>💻 Admin Dashboard</p>
      </main>
    </PageContainer>
  </PleaseSignIn>
);

export default Admin;
