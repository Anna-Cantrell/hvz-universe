import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import {CURRENCY_THREE_QUERY} from '../ListCurrencies';

import Form from '../styles/FormStyles';
import Error from '../ErrorMessage';

const UPDATE_CURRENCY_THREE_MUTATION = gql`
  mutation UPDATE_CURRENCY_THREE_MUTATION(
    $name: String!
  ) {
    updateCurrencyThreeName (
      name: $name
    ) {
      name
    }
  }
`;


class UpdateCurrencyNames extends Component {
  state = {
    currencyThree: '',
  };
  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  }

  render() {
    return (
      <Query query={CURRENCY_THREE_QUERY}>
        { ({data: { currencyThrees }, error, loading}) => {
          if(loading) return <p>loading...</p>;
          if(error) return <p>Error: {error.message}</p>;
          return (
            <Mutation
              mutation={UPDATE_CURRENCY_THREE_MUTATION}
              variables={{ name: this.state.currencyThree }}
              refetchQueries={[{ query: CURRENCY_THREE_QUERY }]}
            >
              {(updateCurrencyThreeName, { loading, error }) => (

                <Form onSubmit={async (e) => {
                    // stop the form from submitting
                    e.preventDefault();
                    // call the mutation
                    const res = await updateCurrencyThreeName();
                  }}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Currency Three Name
                      <input
                        type="text"
                        id="currencyThree"
                        name="currencyThree"
                        placeholder="Currency Three Title"
                        defaultValue={currencyThrees[0] && currencyThrees[0].name}
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

export default UpdateCurrencyNames;
