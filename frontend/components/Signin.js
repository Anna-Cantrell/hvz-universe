import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/FormStyles';
import Router from 'next/router';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';
import RequestReset from './RequestReset';


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
  handleRedirect = () => {
    Router.push('/');
  }
  render() {
    return (
      <div className="signin-container">
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
                this.setState({ name: '', email: '', username: '', pronouns: '', password: ''});
                this.handleRedirect();
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
                    <span className="form-smol">
                      <a href="#" onClick={(e) => {
                          e.preventDefault();
                          $('form.reset').slideDown();
                        }}>Forgot your password?</a>
                    </span>
                  </div>
                </fieldset>
              </Form>
            );
          }}
        </Mutation>
        <RequestReset />
      </div>
    );
  }
}

export default Signin;
