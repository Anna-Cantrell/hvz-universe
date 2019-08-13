import Link from 'next/link';
import { NavStyles } from './styles/HeaderStyles';
import User from './User';

const Nav = () => (
    <User>
      {({ data: { me } }) => (
        <NavStyles>
          {me && (
            <>
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
            </>
          )}
          {!me && (
            <Link href="/signup">
            <a>Sign in / register</a>
            </Link>
          )}
        </NavStyles>
      )}
    </User>
);

export default Nav;
