import Link from 'next/link';
import styled from 'styled-components';
import HeaderStyles from './styles/HeaderStyles';
import Nav from './Nav';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => {
  NProgress.start();
}
Router.onRouteChangeComplete = () => {
  NProgress.done();
}
Router.onrouteChangeError = () => {
  NProgress.done();
}

const Header = () => (
  <HeaderStyles>
    <div className="bar">
      <div className="nav-container">
        <Link href="/">
          <a className="logo"><img src="../static/hvz-universe-logo-white.png" /></a>
        </Link>
        <Nav />
      </div>
      <div className="profile-container">
        <div className="profile"></div>
      </div>
    </div>
  </HeaderStyles>
);

export default Header;