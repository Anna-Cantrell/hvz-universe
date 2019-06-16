import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';
import { title } from '../config';

const SINGLE_PLAYER_QUERY = gql`
  query SINGLE_PLAYER_QUERY($username: String!) {
    user(where: {username: $username}) {
      id
      name
      email
      username
      pronouns
      image
    }
  }
`;

class SinglePlayerPage extends Component {
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
          return (
            <div className="playerPageSingle">
              <Head>
                <title>{title} | {data.user.username}</title>
              </Head>
              <p>Username: {data.user.username}!</p>
              <p>Name: {data.user.name}!</p>
              <p>Email: {data.user.email}!</p>
              <p>Pronouns: {data.user.pronouns}!</p>
              <p>Image:</p>
              {data.user.image && <img src={data.user.image} alt={data.user.username} />}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default SinglePlayerPage;
