import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/FormStyles';
import Error from './ErrorMessage';

const SINGLE_USER_QUERY = gql`
  query SINGLE_USER_QUERY($id: ID!) {
    user(where: {id: $id}) {
      id
      name
      email
      pronouns
      image
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $name: String
    $email: String
    $pronouns: String
    $image: String
  ) {
    updateUser(
      id: $id
      name: $name
      email: $email
      pronouns: $pronouns
      image: $image
    ) {
      id
      name
      pronouns
      image
    }
  }
`;

class UpdatePlayer extends Component {
  state = {};
  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  }

  uploadFile = async (e) => {
    console.log('uploading file...');
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'hvz-universe');

    const res = await fetch('https://api.cloudinary.com/v1_1/dxk1c1orl/image/upload', {
      method: 'POST',
      body: data
    });
    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  }

  updateUser = async (e, updateUserMutation) => {
    e.preventDefault();
    console.log('updating user');
    console.log(this.state);
    const res = await updateUserMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      }
    });
    console.log('updated');
  }
  render() {
    return (
      <Query query={SINGLE_USER_QUERY} variables={{
        id: this.props.id
      }}>
        {({data,loading}) => {
          if(loading) return <p>Loading...</p>;
          if(!data.user) return <p>No User Found</p>;
          return(

            <Mutation
              mutation={UPDATE_ITEM_MUTATION}
              variables={this.state}
            >
              {(updateUser, { loading, error }) => (
                <Form onSubmit={(e) => this.updateUser(e, updateUser)}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <h3>Update Player Info</h3>
                    <label htmlFor="file">
                      New Profile Photo
                      <input
                        type="file"
                        id="file"
                        name="file"
                        placeholder="Upload a profile photo"
                        onChange={this.uploadFile}
                      />
                    {data.user.image && <img src={data.user.image} alt="Upload Preview" />}
                    </label>
                    <label htmlFor="name">
                      Name
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        required
                        defaultValue={data.user.name}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="email">
                      Email
                      <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                        required
                        defaultValue={data.user.email}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="pronouns">
                      Pronouns
                      <input
                        type="text"
                        id="pronouns"
                        name="pronouns"
                        placeholder="Pronouns"
                        required
                        defaultValue={data.user.pronouns}
                        onChange={this.handleChange}
                      />
                    </label>

                    <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>

          );
        }}
      </Query>
    );
  }
}

export default UpdatePlayer;
export { UPDATE_ITEM_MUTATION };
