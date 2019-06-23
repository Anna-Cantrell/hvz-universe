import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';


const CURRENCY_ONE_QUERY = gql`
  query CURRENCY_ONE_QUERY {
    currencyOnes {
      name
    }
  }
`;
const CURRENCY_TWO_QUERY = gql`
  query CURRENCY_TWO_QUERY {
    currencyTwoes {
      name
    }
  }
`;
const CURRENCY_THREE_QUERY = gql`
  query CURRENCY_THREE_QUERY {
    currencyThrees {
      name
    }
  }
`;

class ListCurrencies extends Component {
  render () {
    return (
      <div>
        <p>List of currencies</p>
        <Query query={CURRENCY_ONE_QUERY}>
          { ({data, error, loading}) => {
            if(loading) return <p>loading...</p>;
            if(error) return <p>Error: {error.message}</p>;
            if(data.currencyOnes.length < 1) return <p>No currencies yet</p>;
            return (
              <div>
                {data.currencyOnes.map(currencyOne => <p key={currencyOne.name}>{currencyOne.name}</p>)}
              </div>
            );
          } }
        </Query>
        <Query query={CURRENCY_TWO_QUERY}>
          { ({data, error, loading}) => {
            if(loading) return <p>loading...</p>;
            if(error) return <p>Error: {error.message}</p>;
            if(data.currencyTwoes.length < 1) return <p>No second currency yet</p>;
            return (
              <div>
                {data.currencyTwoes.map(currencyTwo => <p key={currencyTwo.name}>{currencyTwo.name}</p>)}
              </div>
            );
          } }
        </Query>
        <Query query={CURRENCY_THREE_QUERY}>
          { ({data, error, loading}) => {
            if(loading) return <p>loading...</p>;
            if(error) return <p>Error: {error.message}</p>;
            if(data.currencyThrees.length < 1) return <p>No third currency yet</p>;
            return (
              <div>
                {data.currencyThrees.map(currencyThree => <p key={currencyThree.name}>{currencyThree.name}</p>)}
              </div>
            );
          } }
        </Query>
      </div>
    );
  }
}

export default ListCurrencies;
export {CURRENCY_ONE_QUERY};
export {CURRENCY_TWO_QUERY};
export {CURRENCY_THREE_QUERY};
