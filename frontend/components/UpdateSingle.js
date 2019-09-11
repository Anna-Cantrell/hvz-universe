import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import {SingleUpdateStyles} from './styles/UpdatesStyles';
import formatDate from '../lib/formatDate';
import { CURRENT_USER_QUERY } from './User';

const DELETE_UPDATE = gql`
  mutation DELETE_UPDATE($id: ID!) {
    deleteUpdate(id: $id) {
      id
    }
  }
`;

class UpdateSingle extends Component {
  static propTypes = {
    update: PropTypes.object.isRequired,
  };
  render () {
    const { update } = this.props;
    const dt = new Date(update.createdAt);
    return (
      <Mutation
        mutation={DELETE_UPDATE}
        variables={{id: update.id}}
      >
        {(deleteUpdate, { error }) => (
          <Query query={CURRENT_USER_QUERY}>
            {({data}) => {
              if(!data.me) return <p>Please Log In</p>;
              return (
                <SingleUpdateStyles>
                  <div>
                    <p dangerouslySetInnerHTML={{__html: update.title}} />
                    <p>{formatDate(dt, "dddd, MMM d, yyyy h:mmtt")}</p>
                  </div>
                  {data.me.permissions.includes('ADMIN') && (
                    <button className="deleteUpdate" onClick={() => {
                        if(confirm('Are you sure you want to delete this update?')) {
                          deleteUpdate().catch(err => { alert(err.message) });
                        }
                      }}>Delete</button>
                    )}
                  </SingleUpdateStyles>
              )
            }}
          </Query>
        )}
      </Mutation>
    );
  }
}

export default UpdateSingle;
