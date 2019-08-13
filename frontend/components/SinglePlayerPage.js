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

const SINGLE_PLAYER_QUERY = gql`
  query SINGLE_PLAYER_QUERY($username: String!) {
    user(where: {username: $username}) {
      id
      name
      email
      username
      pronouns
      image
      currencyOne
    }
  }
`;

class SinglePlayerPage extends Component {
  renderButton = (thisUser, data) => {
    if(thisUser || this.props.me.permissions.includes('ADMIN')) {
      return (
        <Link href={{
            pathname: "update",
            query: { id: data.user.id }
        }}>
            <a><button>Edit ✏️</button></a>
        </Link>
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
          console.log(data);
          const currOne = data.user.currencyOne;
          const currTwo = data.user.currencyTwo;
          const currThree = data.user.currencyThree;
          return (
            <div className="playerPageSingle">
              <Head>
                <title>{title} | {data.user && data.user.username}</title>
              </Head>
              {this.renderButton(this.props.me.username === data.user.username, data)}
              <p>Username: {data.user.username}</p>
              <p>Name: {data.user.name}</p>
              <p>Email: {data.user.email}</p>
              <p>Pronouns: {data.user.pronouns}</p>
              <p>Image:</p>
              {data.user.image && <img src={data.user.image} alt={data.user.username} />}

              <Query query={CURRENCY_ONE_QUERY}>
                { ({data, error, loading}) => {
                  if(loading) return <p>loading...</p>;
                  if(error) return <p>Error: {error.message}</p>;
                  if(!data.currencyOnes[0].name) return "";
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
                  if(!data.currencyTwoes[0].name) return "";
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
                  if(!data.currencyThrees[0].name) return "";
                  return (
                    <div>
                      <p>{data.currencyThrees[0].name}: {currThree ? currThree : '0'}</p>
                    </div>
                  );
                } }
              </Query>

            </div>
          );
        }}
      </Query>
    );
  }
}

export default SinglePlayerPage;
