import Link from 'next/link';
import { NavStyles } from './styles/HeaderStyles';

const Nav = () => (
  <NavStyles>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/rules">
      <a>Rules</a>
    </Link>
    <Link href="/calendar">
      <a>Calendar</a>
    </Link>
  </NavStyles>
);

export default Nav;
