import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import {CURRENCY_ONE_QUERY} from './ListCurrencies';

import Form from './styles/FormStyles';
import Error from './ErrorMessage';

const UPDATE_CURRENCY_ONE_MUTATION = gql`
  mutation UPDATE_CURRENCY_ONE_MUTATION(
    $name: String!
  ) {
    updateCurrencyOneName (
      name: $name
    ) {
      name
    }
  }
`;


class UpdateCurrencyNameOne extends Component {
  state = {
    currencyOne: '',
  };
  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  }

  render() {
    return (
      <Query query={CURRENCY_ONE_QUERY}>
        { ({data: { currencyOnes }, error, loading}) => {
          if(loading) return <p>loading...</p>;
          if(error) return <p>Error: {error.message}</p>;
          return (
            <Mutation
              mutation={UPDATE_CURRENCY_ONE_MUTATION}
              variables={{ name: this.state.currencyOne }}
              refetchQueries={[{ query: CURRENCY_ONE_QUERY }]}
            >
              {(updateCurrencyOneName, { loading, error }) => (

                <Form onSubmit={async (e) => {
                    // stop the form from submitting
                    e.preventDefault();
                    // call the mutation
                    console.log(this.state.currencyOne);
                    const res = await updateCurrencyOneName();
                    console.log(res);
                  }}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Currency One Name
                      <input
                        type="text"
                        id="currencyOne"
                        name="currencyOne"
                        placeholder="Currency One Title"
                        required
                        defaultValue={currencyOnes[0] && currencyOnes[0].name}
                        onChange={this.handleChange}
                      />
                    </label>

                    <button type="submit">Submit</button>
                  </fieldset>
                </Form>

              )}
            </Mutation>
          );
        } }
      </Query>
    );
  }
}

export default UpdateCurrencyNameOne;
