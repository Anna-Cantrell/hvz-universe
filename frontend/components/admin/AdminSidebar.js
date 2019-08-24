import Link from 'next/link';
import Router from 'next/router';
import { Query } from 'react-apollo';
import {SidebarStyles} from '../styles/SidebarStyles';
import { CURRENT_USER_QUERY } from '../User';


const AdminSidebar = props => (
  <SidebarStyles className="admin-sidebar">
    <Query query={CURRENT_USER_QUERY}>
      {({data, loading}) => {
        if(loading) return <p>...loading</p>;
        if(!data.me) return <p>Please log in</p>
        if(!data.me.permissions.includes('ADMIN')) return <p>This is an admin area.</p>;
        const path = Router.router && Router.router.pathname;
        return (
          <ul className="main-sidebar">
            <li className={path == "/hvz-admin" ? "active" : ""}>
              <Link href="/hvz-admin">
                <a>Dashboard</a>
              </Link>
            </li>
            <li className={path == "/hvz-admin/pages" ? "active" : ""}>
              <Link href="/hvz-admin/pages">
                <a>Pages</a>
              </Link>
            </li>
            <li className={path == "/hvz-admin/custom-updates" ? "active" : ""}>
              <Link href="/hvz-admin/custom-updates">
                <a>Custom Updates</a>
              </Link>
            </li>
            <li className={path == "/hvz-admin/permissions" ? "active" : ""}>
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
