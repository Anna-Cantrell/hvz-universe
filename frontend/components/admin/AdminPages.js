import React, { Component } from 'react';


class AdminPages extends Component {
  state = {
    page: "updates",
  }
  changeState = (e) => {
    this.setState({ page: e.target.value });
  }
  render() {
    let pages = ["updates", "Loot Boxes", "Currencies", "New Players"];
    return (
      <div>Pages!</div>
    );
  }
};

export default AdminPages;
