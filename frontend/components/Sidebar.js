import React, { Component } from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import Nav from './Nav';
import Profile from './Profile';
import Currency from './Currency';
import Actions from './Actions';
import {SidebarStyles} from './styles/SidebarStyles';
import { CURRENT_USER_QUERY } from './User';


class Sidebar extends Component {
  triggerDrawer = () => {
    $('#actionDrawer').slideToggle();
    $('.sidebar-trigger').toggleClass('open');
  }
  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({data, loading}) => {
          if(loading) return <p>...loading</p>;
          if(!data.me) return "Please Sign In";
          console.log(data);
          return (
            <SidebarStyles className="sidebar">
              <Link href={{
                pathname: '/player',
                query: { username: data.me.username }
              }}>
                <a>
                  <Profile user={data.me} />
                </a>
              </Link>
              <section id="actionDrawer" className="actions">
                <Currency
                  currencyOne={data.me.currencyOne}
                  currencyTwo={data.me.currencyTwo}
                  currencyThree={data.me.currencyThree} />
                <Actions />
              </section>
              <div className="sidebar-trigger" onClick={this.triggerDrawer}></div>
            </SidebarStyles>
          );
        }}
      </Query>
    )
  }
}

export default Sidebar;
