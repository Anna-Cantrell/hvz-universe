import Link from 'next/link';
import { Query } from 'react-apollo';
import Nav from './Nav';
import gql from 'graphql-tag';
import {CURRENCY_ONE_QUERY, CURRENCY_TWO_QUERY, CURRENCY_THREE_QUERY} from './ListCurrencies';


const Currency = props => (
  <div className="currency-container">
    <div>Currency has</div>
    <div className="currency-fields">
    <Query query={CURRENCY_ONE_QUERY}>
      { ({data, error, loading}) => {
        if(loading) return <p>loading...</p>;
        if(error) return <p>Error: {error.message}</p>;
        if(!data.currencyOnes[0].name) return "";
        return (
          <div>
            <p>{data.currencyOnes[0].name}: {props.currencyOne ? props.currencyOne : '0'}</p>
          </div>
        );
      } }
    </Query>
    <Query query={CURRENCY_TWO_QUERY}>
      { ({data, error, loading}) => {
        if(loading) return <p>loading...</p>;
        if(error) return <p>Error: {error.message}</p>;
        if(!data.currencyTwoes[0].name) return "";
        return (
          <div>
            <p>{data.currencyTwoes[0].name}: {props.currencyTwo ? props.currencyTwo : '0'}</p>
          </div>
        );
      } }
    </Query>
    <Query query={CURRENCY_THREE_QUERY}>
      { ({data, error, loading}) => {
        if(loading) return <p>loading...</p>;
        if(error) return <p>Error: {error.message}</p>;
        if(!data.currencyThrees[0].name) return "";
        return (
          <div>
            <p>{data.currencyThrees[0].name}: {props.currencyThree ? props.currencyThree : '0'}</p>
          </div>
        );
      } }
    </Query>
    </div>
  </div>
);

export default Currency;
