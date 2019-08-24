import AdminSidebar from '../../components/admin/AdminSidebar';
import { PageContainer } from '../../components/styles/GeneralStyles';
import PleaseSignIn from '../../components/PleaseSignIn';

const Admin = props => (
  <PleaseSignIn>
    <PageContainer className="admin-page">
      <AdminSidebar />
      <main>
        <p>💻</p>
        <p>This is the Admin page!!</p>
      </main>
    </PageContainer>
  </PleaseSignIn>
);

export default Admin;
