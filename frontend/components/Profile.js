import Link from 'next/link';
import Nav from './Nav';
import gql from 'graphql-tag';

const Profile = props => (
  <section className="profile">
    <div className="photo">
      <img src={props.user.image} alt={props.user.username} />
    </div>
    <div className="info">
      <div className="username">{props.user.username}</div>
      <div className="title">{props.user.permissions.includes('HUMAN') ? "Human" : "Zombie"}{props.user.classTitle ? " - " + props.user.classTitle : "" }</div>
      {props.user.permissions.includes('ZOMBIE') && (
        <div className="meta">kills: {props.user.killCount}</div>
      )}
    </div>
  </section>
);

export default Profile;
