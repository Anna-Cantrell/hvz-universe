import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import UpdateSingle from './UpdateSingle';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  @media (min-width: ${props => props.theme.tablet}) {
    width: calc(75% - 40px);
  }
`;

const ALL_UPDATES_QUERY = gql`
  query ALL_UPDATES_QUERY {
    updates {
      id
      title
      createdAt
    }
  }
`;

class Updates extends Component {
  render () {
    return (
      <Container>
        <h1>Behold HvZ Universe Updates!</h1>
        <p>Updatessss</p>
        <Query query={ALL_UPDATES_QUERY}>
          { ({data, error, loading}) => {
            if(loading) return <p>loading...</p>;
            if(error) return <p>Error: {error.message}</p>;
            return (
              <div>
                {data.updates.map(update => <UpdateSingle update={update} key={update.id} />)}
              </div>
            );
          } }
        </Query>
      </Container>
    );
  }
}

export default Updates;
export {ALL_UPDATES_QUERY};
