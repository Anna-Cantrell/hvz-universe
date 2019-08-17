import Link from 'next/link';
import { Query } from 'react-apollo';
import {SidebarStyles} from '../styles/SidebarStyles';
import { CURRENT_USER_QUERY } from '../User';


const AdminSidebar = () => (
  <SidebarStyles className="admin-sidebar">
    <Query query={CURRENT_USER_QUERY}>
      {({data, loading}) => {
        if(loading) return <p>...loading</p>;
        if(!data.me) return <p>Please log in</p>
        if(!data.me.permissions.includes('ADMIN')) return <p>This is an admin area.</p>;
        return (
          <ul className="main-sidebar">
            <li>
              <Link href="/hvz-admin/">
                <a>Dashboard</a>
              </Link>
            </li>
            <li>
              <Link href="/hvz-admin/pages">
                <a>Pages</a>
              </Link>
            </li>
            <li>
              <Link href="/hvz-admin/custom-updates">
                <a>Custom Updates</a>
              </Link>
            </li>
            <li>
              <Link href="/hvz-admin/permissions">
                <a>Roles and Permissions</a>
              </Link>
            </li>
          </ul>
        );
      }}
    </Query>
  </SidebarStyles>
);

export default AdminSidebar;
