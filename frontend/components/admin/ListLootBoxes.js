import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../Loading';
import LootBoxListStyles from '../styles/LootBoxListStyles';

const ALL_LOOTBOXES_QUERY = gql`
  query ALL_LOOTBOXES_QUERY {
    lootBoxes(orderBy: title_ASC) {
      id
      unlockCode
      title
      description
      effect
      newTitle
      newLife
      claimed
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
            <div className="title">{this.props.lootbox.title} <span className="code">[{this.props.lootbox.unlockCode}]</span></div>
            <div className="description">{this.props.lootbox.description}</div>
            <div className="effect">Effect: {this.props.lootbox.effect}</div>
            {this.props.lootbox.newTitle && (
              <>
              <div className="new-title">New Title: {this.props.lootbox.newTitle}</div>
              <div className="new-title">New Life Status: {this.props.lootbox.newLife}</div>
              </>
            )}
            <div className="claimed">{!this.props.lootbox.claimed && "un"}claimed</div>
            <button className="deleteBox" onClick={() => {
                if(confirm('Are you sure you want to delete this lootbox?')) {
                  destroyLootBox().catch(err => { alert(err.message) });
                }
              }}>Delete</button>
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
        <LootBoxListStyles>
          {data.lootBoxes.map(lootbox => <RenderLootBox key={lootbox.title} lootbox={lootbox} />)}
        </LootBoxListStyles>
      );
    } }
  </Query>
);

export default ListLootBoxes;
export {ALL_LOOTBOXES_QUERY};
