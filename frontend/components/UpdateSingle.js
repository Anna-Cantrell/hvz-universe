import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UpdateStyles from './styles/UpdateStyles';


class UpdateSingle extends Component {
  static propTypes = {
    update: PropTypes.object.isRequired,
  };
  render () {
    const { update } = this.props;
    return (
      <UpdateStyles>
        <div>
          <h3>{update.title}</h3>
          <p>{update.createdAt}</p>
        </div>
      </UpdateStyles>
    );
  }
}

export default UpdateSingle;
