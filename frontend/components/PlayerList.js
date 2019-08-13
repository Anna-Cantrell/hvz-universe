import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PlayerSingle from './PlayerSingle';
import Pagination from './Pagination';
import styled from 'styled-components';
import { playersPerPage } from '../config';

const Container = styled.div`
  width: 100%;
  box-shadow: 1px 1px 7px -4px #555;
  background: #fff;
  padding: 15px;
  @media (min-width: ${props => props.theme.tablet}) {
    margin: 0 auto;
    padding: 20px;
    width: calc(80% - 40px);
    margin-bottom: 20px;
  }
  h1 {
    a {
      cursor: pointer;
      transition: all .2s;
      opacity: .1;
      &.active {opacity: 1}
    }
  }
`;

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY($skip: Int = 0, $first: Int = ${playersPerPage}, $where: UserWhereInput) {
    users(first: $first, skip: $skip, orderBy: username_ASC, where: $where) {
      id
      name
      username
      pronouns
      image
      permissions
      killCount
    }
  }
`;

const allPlayers = (props, filterBy) => {
  return (
    <>
      <Pagination page={props.page} />
      <Query
        query={ALL_USERS_QUERY}
        variables={{
          skip: props.page * playersPerPage - playersPerPage,
          first: playersPerPage,
          where: {
            filterStatus_in: filterBy,
          }
        }}
      >
        { ({data, error, loading, refetch}) => {
          if(loading) return <p>loading...</p>;
          if(error) return <p>Error: {error.message}</p>;
          return (
            <div>
              {data.users.map(user => <PlayerSingle user={user} key={user.id} />)}
            </div>
          );
        } }
      </Query>
      <Pagination page={props.page} />
    </>
  );
}

class PlayerList extends Component {
  state = {
    filterBy: ["HUMAN", "ZOMBIE"],
    filterClass: 'all',
  }
  render () {
    return (
      <Container>
        <h1>
          <a className={this.state.filterClass == 'human' ? 'active' : ''} onClick={(e) => {
              e.preventDefault();
              this.setState({filterBy: ['HUMAN'], filterClass: 'human'});
            }}>Human </a>
          <a className={this.state.filterClass == 'zombie' ? 'active' : ''} onClick={(e) => {
              e.preventDefault();
              this.setState({filterBy: ['ZOMBIE'], filterClass: 'zombie'});
            }}>Zombie </a>
          <a className={this.state.filterClass == 'all' ? 'active' : ''} onClick={(e) => {
              e.preventDefault();
              this.setState({filterBy: ['ZOMBIE', 'HUMAN'], filterClass: 'all'});
            }}>All </a>
          Players
        </h1>
        {allPlayers(this.props, this.state.filterBy)}
      </Container>
    );
  }
}

export default PlayerList;
export { ALL_USERS_QUERY };
