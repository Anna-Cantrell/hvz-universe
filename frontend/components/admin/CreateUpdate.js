import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import ALL_USERS_QUERY from '../PlayerList';

import Form from '../styles/FormStyles';
import Error from '../ErrorMessage';

const CREATE_UPDATE_MUTATION = gql`
  mutation CREATE_UPDATE_MUTATION( $title: String! ) {
    createUpdate( title: $title ) {
      title
      createdAt
    }
  }
`;

class CreateUpdate extends Component {
  state = {
    title: '',
  };
  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_UPDATE_MUTATION}
        variables={this.state}
      >
        {(createUpdate, { loading, error }) => (
          <Form onSubmit={async (e) => {
              // stop the form from submitting
              e.preventDefault();
              // call the mutation
              const res = await createUpdate();
              console.log(res);
            }}>
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <h3>Create New Update</h3>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </label>

              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateUpdate;
export { CREATE_UPDATE_MUTATION };
