import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PlayerSingle from './PlayerSingle';
import Pagination from './Pagination';
import styled from 'styled-components';
import { playersPerPage } from '../config';

const Container = styled.div`
  width: 100%;
  @media (min-width: ${props => props.theme.tablet}) {
    width: calc(75% - 40px);
  }
`;

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY($skip: Int = 0, $first: Int = ${playersPerPage}) {
    users(first: $first, skip: $skip, orderBy: username_ASC) {
      id
      name
      username
      pronouns
      image
    }
  }
`;

class PlayerList extends Component {
  render () {
    return (
      <Container>
        <h1>List of players</h1>
        <Pagination page={this.props.page} />
        <Query
          query={ALL_USERS_QUERY}
          variables={{
            skip: this.props.page * playersPerPage - playersPerPage,
            first: playersPerPage,
          }}
        >
          { ({data, error, loading}) => {
            if(loading) return <p>loading...</p>;
            if(error) return <p>Error: {error.message}</p>;
            return (
              <div>
                {data.users.map(user => <PlayerSingle user={user} key={user.id} />)}
              </div>
            );
          } }
        </Query>
        <Pagination page={this.props.page} />
      </Container>
    );
  }
}

export default PlayerList;
export { ALL_USERS_QUERY };
