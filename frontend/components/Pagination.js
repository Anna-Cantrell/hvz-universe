import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import { title, playersPerPage } from '../config';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY($where: UserWhereInput) {
    usersConnection(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => (
  <Query
    query={PAGINATION_QUERY}
    variables={{
      where: {
        filterStatus_in: props.filterBy,
      }
    }}
  >
    {({data, loading, error}) => {
      const count = data.usersConnection.aggregate.count;
      const pages = Math.ceil(count / playersPerPage);
      const page = props.page;
      return (
        <PaginationStyles className="pagination">
          <div className="pagination-container">
            <Head>
              <title>{title} | page {page}</title>
            </Head>
            {page > 1 && (
              <Link
                prefetch
                href={{
                  pathname: 'players',
                  query: {page: page - 1},
                }}>
                <a className="btn">Prev</a>
              </Link>
            )}
            <p>page {page} of {pages}</p>
            {page < pages && (
              <Link
                prefetch
                href={{
                  pathname: 'players',
                  query: {page: page + 1},
                }}>
                  <a className="btn" aria-disabled={page >= pages}>Next</a>
              </Link>
            )}
          </div>
        </PaginationStyles>
      );
    }}
  </Query>
);

export default Pagination;
export { PAGINATION_QUERY }
