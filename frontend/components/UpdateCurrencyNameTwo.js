import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import {CURRENCY_TWO_QUERY} from './ListCurrencies';

import Form from './styles/FormStyles';
import Error from './ErrorMessage';

const UPDATE_CURRENCY_TWO_MUTATION = gql`
  mutation UPDATE_CURRENCY_TWO_MUTATION(
    $name: String!
  ) {
    updateCurrencyTwoName (
      name: $name
    ) {
      name
    }
  }
`;


class UpdateCurrencyNameTwo extends Component {
  state = {
    currencyTwo: '',
  };
  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  }

  render() {
    return (
      <Query query={CURRENCY_TWO_QUERY}>
        { ({data: { currencyTwoes }, error, loading}) => {
          if(loading) return <p>loading...</p>;
          if(error) return <p>Error: {error.message}</p>;
          return (
            <Mutation
              mutation={UPDATE_CURRENCY_TWO_MUTATION}
              variables={{ name: this.state.currencyTwo }}
              refetchQueries={[{ query: CURRENCY_TWO_QUERY }]}
            >
              {(updateCurrencyTwoName, { loading, error }) => (

                <Form onSubmit={async (e) => {
                    // stop the form from submitting
                    e.preventDefault();
                    // call the mutation
                    console.log(this.state.currencyTwo);
                    const res = await updateCurrencyTwoName();
                    console.log(res);
                  }}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Currency Two Name
                      <input
                        type="text"
                        id="currencyTwo"
                        name="currencyTwo"
                        placeholder="Currency Two Title"
                        required
                        defaultValue={currencyTwoes[0] && currencyTwoes[0].name}
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

export default UpdateCurrencyNameTwo;
