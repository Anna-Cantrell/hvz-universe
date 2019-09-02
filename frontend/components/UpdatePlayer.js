import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Link from 'next/link';

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
      username
      classTitle
      deathCode
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
    $classTitle: String
  ) {
    updateUser(
      id: $id
      name: $name
      email: $email
      pronouns: $pronouns
      image: $image
      classTitle: $classTitle
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
    $('button[type="submit"]').prop('disabled', true);
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'hvz-universe');

    const res = await fetch('https://api.cloudinary.com/v1_1/dxk1c1orl/image/upload', {
      method: 'POST',
      body: data
    });
    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager && file.eager[0].secure_url
    });
    $('button[type="submit"]').prop('disabled', false);
  }

  updateUser = async (e, updateUserMutation, username) => {
    e.preventDefault();
    console.log('updating user');
    const res = await updateUserMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      }
    });
    console.log('updated');
    Router.push(`/player?username=${username}`);
  }
  render() {
    return (
      <Query query={SINGLE_USER_QUERY} variables={{
        id: this.props.id
      }}>
        {({data,loading}) => {
          if(loading) return <p>Loading...</p>;
          if(!data.user) return <p>No User Found</p>;
          if(this.props.id !== this.props.me.id && !this.props.me.permissions.includes('ADMIN')) return <p>Edit your own stuff!</p>;
          return(

            <Mutation
              mutation={UPDATE_ITEM_MUTATION}
              variables={this.state}
            >
              {(updateUser, { loading, error }) => (
                <Form className="updateplayerform" onSubmit={(e) => this.updateUser(e, updateUser, data.user.username)}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <h3>Update {data.user.username}</h3>
                    <Link href={{
                        pathname: "player",
                        query: { username: data.user.username }
                    }}>
                        <a className="backbutton"><button>Back to profile</button></a>
                    </Link>
                    <label className="file" htmlFor="file">
                      <div>New Profile Photo</div>
                      {this.state.image && <img src={this.state.image} alt="Upload Preview" />}
                      <input
                        type="file"
                        id="file"
                        name="file"
                        placeholder="Upload a profile photo"
                        onChange={this.uploadFile}
                      />
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

                    {this.props.me.permissions.includes('ADMIN') && (
                      <div className="admin-area">
                        <p>These are administrative changes to the profile. <br />Double check your changes before you submit!</p>
                        <label htmlFor="username">
                          Username
                          <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            required
                            defaultValue={data.user.username}
                            onChange={this.handleChange}
                          />
                        </label>
                        <label htmlFor="classTitle">
                          Class Title
                          <input
                            type="text"
                            id="classTitle"
                            name="classTitle"
                            placeholder="Class Title"
                            defaultValue={data.user.classTitle}
                            onChange={this.handleChange}
                          />
                        </label>
                        <label htmlFor="deathCode">
                          Death Code
                          <input
                            type="text"
                            id="deathCode"
                            name="deathCode"
                            placeholder="Death Code"
                            required
                            defaultValue={data.user.deathCode}
                            onChange={this.handleChange}
                          />
                        </label>
                      </div>
                    )}

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
