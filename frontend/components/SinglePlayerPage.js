import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Link from 'next/link';
import Error from './ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';
import { title } from '../config';
import {CURRENCY_ONE_QUERY, CURRENCY_TWO_QUERY, CURRENCY_THREE_QUERY} from './ListCurrencies';
import User from './User';
import PlayerPageStyles from './styles/PlayerPageStyles';

const SINGLE_PLAYER_QUERY = gql`
  query SINGLE_PLAYER_QUERY($username: String!) {
    user(where: {username: $username}) {
      id
      name
      email
      username
      pronouns
      image
      killCount
      permissions
      classTitle
      deathCode
    }
  }
`;

class SinglePlayerPage extends Component {
  state = {
    codeToggle: "hidden",
  }
  renderButton = (thisUser, data) => {
    if(thisUser || this.props.me.permissions.includes('ADMIN')) {
      return (
        <Link href={{
            pathname: "update",
            query: { id: data.user.id }
        }}>
            <a className="editbutton"><button className="editbtn">Edit ✏️</button></a>
        </Link>
      )
    }
    return;
  }

  renderDeathCode = (thisUser, data) => {
    if(thisUser || this.props.me.permissions.includes('ADMIN')) {
      return (
        <button onClick={() => {
            if(this.state.codeToggle == "hidden") {
              this.setState({codeToggle: "visible"});
              return;
            }
            this.setState({codeToggle: "hidden"});
            return;
          }} className="codeToggle">
          {this.state.codeToggle == "hidden" ? "Click to see Death Code" : data.user.deathCode}
        </button>
      )
    }
    return;
  }

  printElem = (deathCode) => {
    var mywindow = window.open('', 'Print', 'height=600,width=800');

    mywindow.document.write('<html><head><title>Print</title>');
    mywindow.document.write('</head><body style="text-align: center;">');
    mywindow.document.write(`<p style="font-family:montserrat;text-transform:uppercase;">Death Code</p><button style="padding: 8px 20px;font-size:26px;font-weight:900;letter-spacing:.1em;font-family:montserrat;border:3px solid #9286e4; color:#9286e4;">${deathCode}</button>`);
    mywindow.document.write('</body></html>');

    mywindow.document.close();
    mywindow.focus()
    mywindow.print();
    mywindow.close();
    return true;
  }

  renderPrintButton = (thisUser, data) => {
    if(thisUser || this.props.me.permissions.includes('ADMIN')) {
      return (
        <button onClick={() => {this.printElem(data.user.deathCode)}} className="printButton">Print 🖨</button>
      )
    }
    return;
  }

  render() {
    return (
      <Query
        query={SINGLE_PLAYER_QUERY}
        variables={{
          username: this.props.username,
        }}>
        {({error, loading, data}) => {
          if(error) return <Error error={error} />;
          if(loading) return <p>Loading</p>;
          if(!data.user) return <p>User {this.props.username} not found!</p>;
          const currOne = data.user.currencyOne;
          const currTwo = data.user.currencyTwo;
          const currThree = data.user.currencyThree;
          const status = data.user.permissions.includes('ZOMBIE') ? "zombie" : "human";
          const titleId = data.user.classTitle ? data.user.classTitle.replace(" ", "").toLowerCase() : "";
          return (
            <PlayerPageStyles id="profilePrint">
              <Head>
                <title>{title} | {data.user && data.user.username}</title>
              </Head>
              {this.renderButton(this.props.me.username === data.user.username, data)}
              <div className="profile-container">

                <div className="profile-image-container">
                  {data.user.image && <img src={data.user.image} alt={data.user.username} />}
                </div>

                <div className="profile-info-container">
                  <div className="profile-status-bar">
                    <span className={"status " + status}>
                      {status}
                    </span>
                    {data.user.classTitle && (
                      <Link href={"/rules#" + titleId}>
                          <a className="title">{data.user.classTitle}</a>
                      </Link>
                    )}
                  </div>
                  <p className="username">{data.user.username}</p>
                  <p className="name">{data.user.name}</p>
                  <p className="pronouns">{data.user.pronouns}</p>
                  {status == "zombie" && (
                    <div className="killcount">
                        <p className="title">kills</p>
                        <p className="count">{data.user.killCount}</p>
                    </div>
                  )}

                  {this.renderDeathCode(this.props.me.username === data.user.username, data)}<br />
                  {this.renderPrintButton(this.props.me.username === data.user.username, data)}


                </div>

              </div>

              <Query query={CURRENCY_ONE_QUERY}>
                { ({data, error, loading}) => {
                  if(loading) return <p>loading...</p>;
                  if(error) return <p>Error: {error.message}</p>;
                  if(!data.currencyOnes[0]) return "";
                  return (
                    <div>
                      <p>{data.currencyOnes[0].name}: {currOne ? currOne : '0'}</p>
                    </div>
                  );
                } }
              </Query>
              <Query query={CURRENCY_TWO_QUERY}>
                { ({data, error, loading}) => {
                  if(loading) return <p>loading...</p>;
                  if(error) return <p>Error: {error.message}</p>;
                  if(!data.currencyTwoes[0]) return "";
                  return (
                    <div>
                      <p>{data.currencyTwoes[0].name}: {currTwo ? currTwo : '0'}</p>
                    </div>
                  );
                } }
              </Query>
              <Query query={CURRENCY_THREE_QUERY}>
                { ({data, error, loading}) => {
                  if(loading) return <p>loading...</p>;
                  if(error) return <p>Error: {error.message}</p>;
                  if(!data.currencyThrees[0]) return "";
                  return (
                    <div>
                      <p>{data.currencyThrees[0].name}: {currThree ? currThree : '0'}</p>
                    </div>
                  );
                } }
              </Query>

            </PlayerPageStyles>
          );
        }}
      </Query>
    );
  }
}

export default SinglePlayerPage;
