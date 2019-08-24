import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Link from 'next/link';
import gql from 'graphql-tag';
import Nav from './Nav';
import Form from './styles/FormStyles';
import Error from './ErrorMessage';
import PopupStyles from './styles/PopupStyles';

const KILL_PLAYER_MUTATION = gql`
  mutation KILL_PLAYER_MUTATION($deathCode: String!, $userId: ID!) {
    deathMutation(deathCode: $deathCode, userId: $userId) {
      username
    }
  }
`;

const OPEN_LOOTBOX_MUTATION = gql`
  mutation OPEN_LOOTBOX_MUTATION($unlockCode: String!, $userId: ID!) {
    openLootBox(unlockCode: $unlockCode, userId: $userId) {
      title
      description
    }
  }
`;


class PopupKill extends Component {
  state = {
    deathCode: '',
    success: false,
  }
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
        <Mutation
          mutation={KILL_PLAYER_MUTATION}
          variables={{
            deathCode: this.state.deathCode,
            userId: this.props.user.id
          }}>
        {(deathMutation, { loading, error }) => (
          <Form className="actionbox zombie" method="post" onSubmit={async (e) => {
            e.preventDefault();
            console.log('submitting');
            await deathMutation();
            this.setState({ deathCode: ''});
            this.setState({ success: true});
          }}>
            <fieldset disabled={loading} aria-busy={loading}>
              <button className="close" onClick={this.props.close}>&times;</button>
              <h2>Make a Zombie!</h2>
              <Error error={error} />
              {this.state.success && "Brains everywhere! You got them!"}
              <label htmlFor="deathCode">
                Enter player code to report a tag!
                <input
                  id="deathCode"
                  name="deathCode"
                  type="text"
                  placeholder="DEATH CODE"
                  value={this.state.deathCode}
                  onChange={this.saveToState}
                />
              </label>
              <button type="submit">Finish them!</button>
            </fieldset>
          </Form>
         )}
        </Mutation>
    );
  }
}

class PopupUnlock extends Component {
  state = {
    unlockCode: '',
    success: false,
    title: '',
    description: '',
  }
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
        <Mutation
          mutation={OPEN_LOOTBOX_MUTATION}
          variables={{
            unlockCode: this.state.unlockCode,
            userId: this.props.user.id
        }}>
          {(openLootBox, { loading, error }) => (
            <Form className="actionbox lootbox" method="post" onSubmit={async (e) => {
              e.preventDefault();
              const box = await openLootBox();
              const title = box.data.openLootBox.title;
              const description = box.data.openLootBox.description;
              this.setState({ unlockCode: '', success: true, title, description });
              console.log(box.data.openLootBox);
            }}>
              <fieldset disabled={loading} aria-busy={loading}>
                <button className="close" onClick={this.props.close}>&times;</button>
                <Error error={error} />
                {this.state.success && (
                  <div className="message">
                    <h2>{this.state.title}</h2>
                    <p>{this.state.description}</p>
                  </div>
                )}
                {!this.state.success && (
                  <>
                  <h2>Unlock the Box!</h2>
                  <label htmlFor="unlockCode">
                    Enter an unlock code below to get your loot
                    <input
                      id="unlockCode"
                      name="unlockCode"
                      type="text"
                      placeholder="Unlock Code"
                      value={this.state.unlockCode}
                      onChange={this.saveToState}
                    />
                  </label>
                  <button type="submit">Open It!</button>
                  </>
                )}
              </fieldset>
            </Form>
          )}
        </Mutation>
    );
  }
}

const ActionPopup = props => (
  <PopupStyles>
    <div>
      {props.action == "kill" && <PopupKill close={props.close} user={props.user} action={props.action} />}
      {props.action == "unlock" && <PopupUnlock close={props.close} user={props.user} action={props.action} />}
    </div>
  </PopupStyles>
);

export default ActionPopup;
