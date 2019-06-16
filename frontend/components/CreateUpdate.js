import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/FormStyles';

class CreateUpdate extends Component {
  render() {
    return (
      <Form>
      <h3>Create Custom Update</h3>
        <fieldset>
          <label htmlFor="title">
            Title
            <input type="text" id="title" name="title" placeholder="title" required />
          </label>
        </fieldset>
      </Form>
    );
  }
}

export default CreateUpdate;
