import React, { Component } from 'react';
import Link from 'next/link';
import Nav from './Nav';
import gql from 'graphql-tag';
import ActionPopup from './ActionPopup';


class Actions extends Component {
  state = {
    action_open: '',
  };
  handleActionPopup = e => {
    const button = e.target;
    if(button.name) {
      this.setState({action_open: button.name});
    } else {
      this.setState({action_open: ''});
    }
  }
  render() {
    return (
      <div className="container">
        <button className="btn btn-action" name="kill" onClick={this.handleActionPopup}>Kill a human</button>
        <button className="btn btn-action" name="unlock" onClick={this.handleActionPopup}>Unlock loot box</button>
        {this.state.action_open && <ActionPopup user={this.props.me} close={this.handleActionPopup} action={this.state.action_open} />}
      </div>
    )
  }
};

export default Actions;
