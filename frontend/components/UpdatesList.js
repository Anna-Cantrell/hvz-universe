import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import UpdateSingle from './UpdateSingle';
import styled from 'styled-components';
import { updatesPerPage } from '../config';




const QUERY = gql`
  query updates($skip: Int = 0, $first: Int = ${updatesPerPage}) {
    updates(skip: $skip, first: $first, orderBy: createdAt_DESC) {
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
  render() {
    const {loading, errors, updates} = this.props.data;

    return (
      <div className="matchlist">
        {loading && <div className="loader" />}
        {errors && <div className="errors">...</div>}

        {!loading && !updates && <span className="none">No Matches Found!</span>}

        {!loading &&
          updates &&
          updates.map(update => <UpdateSingle update={update} key={update.id} />)}

        {!loading &&
          updates &&
          <button onClick={this.onFetchMore}>
            Fetch More Matches
          </button>}
      </div>
    );
  }

  onFetchMore = () => {
    const { updates, fetchMore } = this.props.data;
    let loads = this.state.loads + 1;
    this.setState({loads}, fetchLoadMore);

    function fetchLoadMore() {
      fetchMore({
        variables: { first: updatesPerPage, skip: this.state.loads * updatesPerPage - updatesPerPage },
        updateQuery: (previousResult, { fetchMoreResult, queryVariables }) => {
          return {
            ...previousResult,
            // Add the new updates data to the end of the old updates data.
            updates: [
              ...previousResult.updates,
              ...fetchMoreResult.updates,
            ],
          };
        },
      });
    }
  }
}

export default graphql(QUERY, {
  options: { variables: { first: updatesPerPage, skip: 0 } }
})(UpdatesList);
