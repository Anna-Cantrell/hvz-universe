import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/FormStyles';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION(
    $email: String!,
    $password: String!,
  ) {
    signin (
      email: $email,
      password: $password,
    ) {
      id
      email
      name
      username
    }
  }
`;

class Signin extends Component {
  state = {
    name: '',
    email: '',
    username: '',
    pronouns: '',
    password: '',
  }
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries = {[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, {error, loading}) => {
          return (
            <Form method="post" onSubmit={async (e) => {
              e.preventDefault();
              await signin();
              this.setState({ name: '', email: '', username: '', pronouns: '', password: ''})
            }}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign in!</h2>
                <Error error={error} />
                <div className="fields-container signin">
                  <label htmlFor="email">
                    Email
                    <input
                      type="text"
                      name="email"
                      placeholder="email"
                      value={this.state.email}
                      onChange={this.saveToState} />
                  </label>
                  <label htmlFor="password">
                    Password
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      value={this.state.password}
                      onChange={this.saveToState} />
                  </label>
                </div>
                <div className="submit-container">
                  <button type="submit">Sign In</button>
                </div>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signin;
