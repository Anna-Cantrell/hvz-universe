import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import Form from './styles/FormStyles';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!,
    $name: String!,
    $password: String!,
    $username: String!,
    $pronouns: String,
    $image: String,
    $pwCheck: String!,
  ) {
    signup (
      email: $email,
      name: $name,
      password: $password,
      username: $username,
      pronouns: $pronouns,
      image: $image,
      pwCheck: $pwCheck,
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
    pwCheck: '',
  }
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
              this.setState({ name: '', email: '', username: '', pronouns: '', password: '', pwCheck: ''})
            }}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Register Today!</h2>
                <p>Join Greensboro's Largest Game of Tag</p>
                <Error error={error} />
                <div className="fields-container">
                  <label htmlFor="name">
                    Name*
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="name"
                      value={this.state.name}
                      onChange={this.saveToState} />
                  </label>
                  <label htmlFor="email">
                    Email*
                    <input
                      type="text"
                      name="email"
                      required
                      placeholder="email"
                      value={this.state.email}
                      onChange={this.saveToState} />
                  </label>
                  <label htmlFor="username">
                    Username*
                    <input
                      type="text"
                      name="username"
                      pattern="^[a-zA-Z0-9]*$"
                      maxLength="40"
                      required
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
                  <label className="file" htmlFor="file">
                    Profile Photo*
                    <div className="media-container">
                      {this.state.image && <div className="image-preview"><img src={this.state.image} alt="Upload Preview" /></div>}
                      <input
                        type="file"
                        id="file"
                        name="file"
                        required
                        onChange={this.uploadFile}
                      />
                    </div>
                  </label>
                  <label htmlFor="password">
                    Password*
                    <input
                      type="password"
                      name="password"
                      required
                      maxLength="40"
                      placeholder="password"
                      value={this.state.password}
                      onChange={this.saveToState} />
                  </label>
                  <label htmlFor="pwCheck">
                    Confirm Password*
                    <input
                      type="password"
                      name="pwCheck"
                      required
                      maxLength="40"
                      placeholder="confirm password"
                      value={this.state.pwCheck}
                      onChange={this.saveToState} />
                  </label>
                </div>
                <div className="submit-container">
                  <button className="btn" type="submit">Get Registered</button>
                  <span className="form-smol">Already slayin zoms or gettin brain noms?
                    <Link href="/signin">
                      <a>Click here to sign in</a>
                    </Link>
                  </span>
                </div>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signup;
