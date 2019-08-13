import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {SingleUpdateStyles} from './styles/UpdatesStyles';
import formatDate from '../lib/formatDate';


class UpdateSingle extends Component {
  static propTypes = {
    update: PropTypes.object.isRequired,
  };
  render () {
    const { update } = this.props;
    const dt = new Date(update.createdAt);
    return (
      <SingleUpdateStyles>
        <div>
          <p dangerouslySetInnerHTML={{__html: update.title}} />
          <p>{formatDate(dt, "dddd, MMM d, yyyy h:mmtt")}</p>
        </div>
      </SingleUpdateStyles>
    );
  }
}

export default UpdateSingle;
