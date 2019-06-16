import Link from 'next/link';
import Nav from './Nav';
import Profile from './Profile';
import Currency from './Currency';
import Actions from './Actions';
import {SidebarStyles} from './styles/SidebarStyles';

const Sidebar = () => (
    <SidebarStyles>
      <Profile />
      <Currency />
      <Actions />
    </SidebarStyles>
);

export default Sidebar;
