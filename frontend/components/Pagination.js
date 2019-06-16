import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import { title, playersPerPage } from '../config';
import Link from 'next/link';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    usersConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => (
  <Query query={PAGINATION_QUERY}>
    {({data, loading, error}) => {
      if(loading) return <p>Loading...</p>;
      const count = data.usersConnection.aggregate.count;
      const pages = Math.ceil(count / playersPerPage);
      const page = props.page;
      return (
        <div className="pagination">
        <Head>
          <title>{title} | page {page}</title>
        </Head>
        <Link
          prefetch
          href={{
            pathname: 'players',
            query: {page: page - 1},
          }}>
          <a>Prev</a>
        </Link>
          <p>page {page} of {pages}</p>
          <p>{count} players total</p>
          <Link
            prefetch
            href={{
              pathname: 'players',
              query: {page: page + 1},
            }}>
            <a aria-disabled={page >= pages}>Next</a>
          </Link>
        </div>
      );
    }}
  </Query>
);

export default Pagination;
