import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import HeaderStyles from './styles/HeaderStyles';
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

class Header extends Component {
  triggerMenu = () => {
    $('#data-tray').slideToggle(200);
  }
  render() {
    return (
      <User>
      {({ data: { me } }) => {
        const stateClass = me && me.permissions.includes('ZOMBIE') ? "zombie" : "human";
        return (
          <HeaderStyles className={stateClass}>
          <div className="bar">
          <div className="nav-container">
          <Link href="/">
            <a className="logo"><img src="../static/hvz-universe-logo-white.png" /></a>
          </Link>
          <Nav />
          </div>
          <div className="profile-container" onClick={this.triggerMenu}>
          {me && (
            <div className="profile">
              <img src={me.image} alt={me.username} />
            </div>
          )}
          {me && (
            <ul id="data-tray" className="data-tray">
            <li>
            <Link href={{
              pathname: '/player',
              query: { username: me.username }
            }}>
            <a>view profile</a>
            </Link>
            </li>
            {me.permissions.includes('ADMIN') && (
              <li>
                <Link href={{
                  pathname: '/hvz-admin',
                }}>
                  <a>Admin Dashboard</a>
                </Link>
              </li>
            )}
            <li><Signout /></li>
            </ul>
          )}
          </div>
          </div>
          </HeaderStyles>
        );
      }}
      </User>
    );
  }
};

export default Header;
