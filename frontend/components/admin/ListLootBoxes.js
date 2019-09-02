import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../Loading';

const ALL_LOOTBOXES_QUERY = gql`
  query ALL_LOOTBOXES_QUERY {
    lootBoxes(orderBy: title_ASC) {
      id
      title
    }
  }
`;

const DESTROY_LOOTBOX_MUTATION = gql`
  mutation DESTROY_LOOTBOX_MUTATION($id: ID!) {
    destroyLootBox(id: $id) {
      id
    }
  }
`;

class RenderLootBox extends Component {
  update = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_LOOTBOXES_QUERY });
    // filter deleted item out of page
    data.lootBoxes = data.lootBoxes.filter(lootBox => lootBox.id !== payload.data.destroyLootBox.id);
    // put items back
    cache.writeQuery({query: ALL_LOOTBOXES_QUERY, data});
  }
  render () {
    return (
      <Mutation
        mutation={DESTROY_LOOTBOX_MUTATION}
        variables={{id: this.props.lootbox.id}}
        update={this.update}
      >
        {(destroyLootBox, { error }) => (
          <div className="lootbox-container">
          {this.props.lootbox.title}
            <button onClick={() => {
                if(confirm('Are you sure you want to delete this lootbox?')) {
                  destroyLootBox().catch(err => { alert(err.message) });
                }
              }}>Delete Loot Box</button>
          </div>
        )}
      </Mutation>
    );
  }
}

const ListLootBoxes = () => (
  <Query query={ALL_LOOTBOXES_QUERY}>
    { ({data, error, loading}) => {
      if(loading) return <Loading />;
      if(error) return <p>Error: {error.message}</p>;
      return (
        <div className="lootbox-list-container">
          {data.lootBoxes.map(lootbox => <RenderLootBox key={lootbox.title} lootbox={lootbox} />)}
        </div>
      );
    } }
  </Query>
);

export default ListLootBoxes;
export {ALL_LOOTBOXES_QUERY};
