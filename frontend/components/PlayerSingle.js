import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UpdateStyles from './styles/UpdateStyles';
import Link from 'next/link';
import DeleteUser from './DeleteUser';


class PlayerSingle extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };
  render () {
    const { user } = this.props;
    return (
      <UpdateStyles>
        {user.image && <img src={user.image} alt={user.username} />}
        <Link href={{
            pathname: '/player',
            query: { username: user.username }
          }}>
          <a>
            <div>{user.name}</div>
            <div>{user.username}</div>
            <div>{user.pronouns}</div>
          </a>
        </Link>
        <Link href={{
            pathname: "update",
            query: { id: user.id }
        }}>
            <a>Edit ✏️</a>
        </Link>
        <DeleteUser id={user.id}>Delete User</DeleteUser>
      </UpdateStyles>
    );
  }
}

export default PlayerSingle;
