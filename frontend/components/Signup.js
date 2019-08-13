import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/FormStyles';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!,
    $name: String!,
    $password: String!,
    $username: String!,
    $pronouns: String!
  ) {
    signup (
      email: $email,
      name: $name,
      password: $password,
      username: $username,
      pronouns: $pronouns
    ) {
      id
      email
      name
      username
    }
  }
`;

class Signup extends Component {
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
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, {error, loading}) => {
          return (
            <Form method="post" onSubmit={async (e) => {
              e.preventDefault();
              await signup();
              this.setState({ name: '', email: '', username: '', pronouns: '', password: ''})
            }}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign up to play!</h2>
                <Error error={error} />
                <label htmlFor="name">
                  Name
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={this.state.name}
                    onChange={this.saveToState} />
                </label>
                <label htmlFor="email">
                  Email
                  <input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.saveToState} />
                </label>
                <label htmlFor="username">
                  Username
                  <input
                    type="text"
                    name="username"
                    pattern="^[a-zA-Z0-9]*$"
                    maxlength="40"
                    placeholder="username"
                    value={this.state.username}
                    onChange={this.saveToState} />
                </label>
                <label htmlFor="pronouns">
                  Pronouns
                  <input
                    type="text"
                    name="pronouns"
                    placeholder="pronouns"
                    value={this.state.pronouns}
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
                <button type="submit">Get Registered</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signup;
