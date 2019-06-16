import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_USERS_QUERY } from './PlayerList';

const DELETE_USER_MUTATION = gql`
  mutation DELETE_USER_MUTATION($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

 class DeleteUser extends Component {
   update = (cache, payload) => {
     const data = cache.readQuery({ query: ALL_USERS_QUERY });
     // filter deleted item out of page
     data.users = data.users.filter(user => user.id !== payload.data.deleteUser.id);
     // put items back
     cache.writeQuery({query: ALL_USERS_QUERY, data});
   }
   render() {
     return (
       <Mutation
         mutation={DELETE_USER_MUTATION}
         variables={{id: this.props.id}}
         update={this.update}
       >
         {(deleteUser, { error }) => (
           <button onClick={() => {
               if(confirm('Are you sure you want to delete this user?')) {
                 deleteUser();
               }
             }}>{this.props.children}</button>
         )}
       </Mutation>
     );
   }
 }

 export default DeleteUser;
