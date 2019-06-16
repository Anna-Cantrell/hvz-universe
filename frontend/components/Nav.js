import Link from 'next/link';
import { NavStyles } from './styles/HeaderStyles';

const Nav = () => (
  <NavStyles>
    <Link href="/home">
      <a>Home</a>
    </Link>
    <Link href="/rules">
      <a>Rules</a>
    </Link>
    <Link href="/calendar">
      <a>Calendar</a>
    </Link>
    <Link href="/players">
      <a>Players</a>
    </Link>
  </NavStyles>
);

export default Nav;
