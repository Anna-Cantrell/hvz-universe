import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/FormStyles';
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION( $email: String! ) {
    requestReset ( email: $email ) {
      message
    }
  }
`;

class Signin extends Component {
  state = {
    email: '',
  }
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <Mutation
        mutation={REQUEST_RESET_MUTATION}
        variables={this.state}
      >
        {(reset, {error, loading, called}) => {
          return (
            <Form className="reset" style={{display: "none"}} method="post" onSubmit={async (e) => {
              e.preventDefault();
              await reset();
              this.setState({email: ''})
            }}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Request Password Reset</h2>
                <Error error={error} />
                {!error && !loading && called && <p>Check your email for a reset link!</p>}
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
                </div>
                <div className="submit-container">
                  <button type="submit">Request Reset</button>
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
