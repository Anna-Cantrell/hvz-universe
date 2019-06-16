import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import ALL_USERS_QUERY from './PlayerList';

import Form from './styles/FormStyles';
import Error from './ErrorMessage';

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION(
    $name: String!
    $email: String!
    $pronouns: String!
    $username: String!
    $image: String
    $largeImage: String
  ) {
    createUser(
      name: $name
      email: $email
      pronouns: $pronouns
      username: $username
      image: $image
      largeImage: $largeImage
    ) {
      id
      username
    }
  }
`;

class CreatePlayer extends Component {
  state = {
    name: 'anna',
    email: 'annatest@gmail.com',
    pronouns: 'she her hers',
    username: 'superzombie',
    image: '',
    largeImage: '',
  };
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

  render() {
    return (
      <Mutation
        mutation={CREATE_USER_MUTATION}
        variables={this.state}
      >
        {(createUser, { loading, error }) => (
          <Form onSubmit={async (e) => {
              // stop the form from submitting
              e.preventDefault();
              // call the mutation
              const res = await createUser();
              // bring them to the user page
              console.log(res);
              Router.push({
                pathname: '/player',
                query: {username: res.data.createUser.username}
              });
            }}>
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <h3>Create New Player</h3>
              <label htmlFor="file">
                Profile Photo
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload a profile photo"
                  required
                  onChange={this.uploadFile}
                />
              {this.state.image && <img src={this.state.image} alt="Upload Preview" />}
              </label>
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  required
                  value={this.state.name}
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
                  value={this.state.email}
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
                  value={this.state.pronouns}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="username">
                Username
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  required
                  value={this.state.username}
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

export default CreatePlayer;
export { CREATE_USER_MUTATION };
