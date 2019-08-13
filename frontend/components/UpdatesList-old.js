import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import UpdateSingle from './UpdateSingle';
import Pagination from './Pagination';
import styled from 'styled-components';
import { playersPerPage } from '../config';

const ALL_UPDATES_QUERY = gql`
  query ALL_UPDATES_QUERY($first: Int = ${playersPerPage}) {
    updates(first: $first, orderBy: createdAt_DESC) {
      id
      title
      createdAt
    }
  }
`;

class UpdatesList extends Component {
  state = {
    loads: 1,
  }
  render () {
    return (
      <Query
        query={ALL_UPDATES_QUERY}
        variables={{
          first: playersPerPage * this.state.loads,
        }}
        >
        { ({data: { updates, fetchMore }, error, loading}) => {
          if(loading) return <p>loading...</p>;
          if(error) return <p>Error: {error.message}</p>;
          return (
            <div className="update-list-container">
              {updates.map(update => <UpdateSingle update={update} key={update.id} />)}

              <button onClick={() => {
                  console.log(fetchMore);

                  // fetchMore({
                  //   variables: { date: updates[updates.length - 1].createdAt },
                  //   updateQuery: (previousResult, { fetchMoreResult, queryVariables }) => {
                  //     return {
                  //       ...previousResult,
                  //       // Add the new updates data to the end of the old updates data.
                  //       updates: [
                  //         ...previousResult.updates,
                  //         ...fetchMoreResult.updates,
                  //       ],
                  //     };
                  //   },
                  // });
              }}>
              Fetch More Matches
              </button>
            </div>
          );
        } }
      </Query>
    );
  }
}

export default UpdatesList;
export { ALL_UPDATES_QUERY };
