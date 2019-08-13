import Link from 'next/link';
import styled from 'styled-components';
import FooterStyles from './styles/FooterStyles';
import Nav from './Nav';
import Router from 'next/router';
import NProgress from 'nprogress';
import Signout from './Signout';
import User from './User';

Router.onRouteChangeStart = () => {
  NProgress.start();
}
Router.onRouteChangeComplete = () => {
  NProgress.done();
}
Router.onrouteChangeError = () => {
  NProgress.done();
}

const Footer = () => (
  <User>
    {({ data: { me } }) => {
      const stateClass = me && me.permissions.includes('ZOMBIE') ? "zombie" : "human";
      return (
        <FooterStyles className={stateClass}>
          <div className="bar">
            <div className="nav-container">
              <Nav />
              <div className="subfooter">
                <Link href="/">
                <a className="logo"><img src="../static/hvz-universe-logo-white.png" /></a>
                </Link>
                <div className="footer-info">
                  <p>HvZ Universe&copy; {new Date().getFullYear()} All rights reserved.</p>
                  <p><a>Terms of Service</a> <a>Privacy Policy</a></p>
                </div>
              </div>
            </div>
          </div>
        </FooterStyles>
      );
    }}
  </User>
);

export default Footer;
