import React, { Component } from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import Nav from './Nav';
import Profile from './Profile';
import Currency from './Currency';
import Actions from './Actions';
import {SidebarStyles} from './styles/SidebarStyles';
import { CURRENT_USER_QUERY } from './User';

// to add currency:
// {data.me.currencyOne && (
//   <Currency
//     currencyOne={data.me.currencyOne}
//     currencyTwo={data.me.currencyTwo}
//     currencyThree={data.me.currencyThree} />
// )}

class Sidebar extends Component {
  triggerDrawer = () => {
    $('#actionDrawer').slideToggle();
    $('.sidebar-trigger').toggleClass('open');
  }
  componentDidMount() {
    this.props.type != "compressed" && $('#twitterfeed').append('<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>');
  }
  render() {
    return (
      <>
      <Query query={CURRENT_USER_QUERY}>
        {({data, loading}) => {
          if(loading) return <p>...loading</p>;
          if(!data.me) return "Please Sign In";
          const sidebarClasses = this.props.type ? this.props.type + " sidebar" : "sidebar";
          return (
            <>
            <SidebarStyles className={sidebarClasses}>
              <div className="main-sidebar">
                <Link href={{
                  pathname: '/player',
                  query: { username: data.me.username }
                }}>
                  <a className="profile-container">
                    <Profile user={data.me} />
                  </a>
                </Link>
                <section id="actionDrawer" className="actions">
                  <Actions me={data.me} />
                </section>
                <div className="sidebar-trigger" onClick={this.triggerDrawer}></div>
              </div>

              <div  id="twitterfeed" className="twitter-feed">
                <a className="twitter-timeline" href="https://twitter.com/hvzuncg?ref_src=twsrc%5Etfw">Tweets by HvZ UNCG</a>
                <div><span>Loading...</span></div>
              </div>
            </SidebarStyles>
            </>
          );
        }}
      </Query>
      </>
    )
  }
}

export default Sidebar;
