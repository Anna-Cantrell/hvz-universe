import React, { Component } from 'react';
import { graphql, Query } from 'react-apollo';
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

const LOAD_MORE_QUERY = gql`
  query LOAD_MORE_QUERY {
    updatesConnection {
      aggregate {
        count
      }
    }
  }
`;



class UpdatesList extends Component {
  state = {
    loads: 1,
  }
  componentDidMount() {
    this.getLoads();
  }
  getLoads = () => {
    if(this.props.data.updates) {
      this.setState({loads: this.props.data.updates.length / updatesPerPage});
    }
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

            <Query query={LOAD_MORE_QUERY}>
              {({data, loading, error}) => {
                if(loading) return <p>Loading...</p>;
                const count = data.updatesConnection.aggregate.count;
                const pages = Math.ceil(count / updatesPerPage);
                const page = Math.floor(this.state.loads);
                return (
                  <div>
                    {page < pages && (
                      <div className="load_more">
                        <button className="btn" onClick={this.onFetchMore}>
                          Load More
                        </button>
                      </div>
                    )}
                  </div>
                );
              }}
            </Query>


        }
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
