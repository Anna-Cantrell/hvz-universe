import { Query, Mutation } from 'react-apollo';
import Error from '../ErrorMessage';
import gql from 'graphql-tag';
import Table from '../styles/Table';
import PropTypes from 'prop-types';

const possiblePermissions = [
  'ADMIN',
  'HUMAN',
  'ZOMBIE',
  'OZ',
  'PLAYERCREATE',
  'PLAYERUPDATE',
  'PLAYERDELETE',
  'PERMISSIONUPDATE',
];

const ADMIN_ALL_USERS_QUERY = gql`
  query {
    adminUsers {
      id
      name
      username
      email
      permissions
    }
  }
`;

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

const Permissions = props => (
  <Query query={ADMIN_ALL_USERS_QUERY}>
  {({data, loading, error}) => (
    <div>
      <Error error={error} />
      <div>
        <h2>Manage Roles and Permissions</h2>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {possiblePermissions.map(permission => <th key={permission}>{permission}</th>)}
              <th>👇</th>
            </tr>
          </thead>
          <tbody>
            {data.adminUsers && data.adminUsers.map(user => <UserPermissions key={user.id} user={user} />)}
          </tbody>
        </Table>
      </div>
    </div>
  )}
  </Query>
);

class UserPermissions extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array,
    }).isRequired,
  };
  state = {
    permissions: this.props.user.permissions,
  };
  handlePermissionChange = e => {
    const checkbox = e.target;
    // take a copy of current permissions
    let updatedPermissions = [...this.state.permissions];
    // figure out if we should add or remove it
    if(checkbox.checked) {
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value);
    }
    this.setState({permissions: updatedPermissions});
  }
  render() {
    const user = this.props.user;
    return (
      <Mutation
        mutation={UPDATE_PERMISSIONS_MUTATION}
        variables={{
          permissions: this.state.permissions,
          userId: this.props.user.id
      }}>
        {(updatePermissions, { loading, error }) => (
          <>
          { error && <tr><td colspan="10"><Error error={error} /></td></tr> }
          <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            {possiblePermissions.map(permission => (
              <td key={permission}>
                <label htmlFor={`${user.id}-permission-${permission}`}>
                  <input
                    id={`${user.id}-permission-${permission}`}
                    type="checkbox"
                    checked={this.state.permissions.includes(permission)}
                    value={permission}
                    onChange={this.handlePermissionChange}
                    />
                </label>
              </td>
            ))}
            <td>
              <button
                type="button"
                disabled={loading}
                onClick={updatePermissions}
              >Updat{loading ? 'ing' : 'e'}</button>
            </td>
          </tr>
          </>
        )}
      </Mutation>
    );
  }
}

export default Permissions;
