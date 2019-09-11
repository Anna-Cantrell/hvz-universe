import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlayerListStyles from './styles/PlayerListStyles';
import Link from 'next/link';
import DeleteUser from './DeleteUser';

// <DeleteUser id={user.id}>Delete User</DeleteUser>

class PlayerSingle extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };
  render () {
    const { user } = this.props;
    return (
      <PlayerListStyles>
        <Link href={{
            pathname: '/player',
            query: { username: user.username }
          }}>
          <a className="link-container">
            <div className="image-container">
              {user.image && <img src={user.image} alt={user.username} />}
            </div>
            <div className="info-container">
              <div>
                <div><strong>{user.username}</strong></div>
                <div>{user.name}</div>
                <span className="meta">
                  {user.permissions.includes('ZOMBIE') ? "zombie" : "human"} {user.classTitle && " - " + user.classTitle}
                </span>
              </div>
            </div>
            {user.permissions.includes('ZOMBIE') && (
              <div className="count">
                <div>
                  <span>kills</span>
                  {user.killCount}
                </div>
              </div>
            )}
          </a>
        </Link>
      </PlayerListStyles>
    );
  }
}

export default PlayerSingle;
