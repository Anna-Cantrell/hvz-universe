import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import ListLootBoxes, {ALL_LOOTBOXES_QUERY} from './ListLootBoxes';
import Form from '../styles/FormStyles';
import Error from '../ErrorMessage';

const CREATE_LOOTBOX_MUTATION = gql`
  mutation CREATE_LOOTBOX_MUTATION( $unlockCode: String!, $title: String!, $description: String!, $effect: String!, $newTitle: String!, $newLife: String! ) {
    createLootBox( unlockCode: $unlockCode, title: $title, description: $description, effect: $effect,  newTitle: $newTitle, newLife: $newLife ) {
      title
    }
  }
`;

class CreateLootBox extends Component {
  state = {
    unlockCode: '',
    title: '',
    description: '',
    effect: 'resurrect',
    newTitle: '',
    newLife: 'human',
  };
  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_LOOTBOX_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: ALL_LOOTBOXES_QUERY }]}
      >
        {(createLootBox, { loading, error }) => (
          <>
          <Form onSubmit={async (e) => {
              // stop the form from submitting
              e.preventDefault();
              // call the mutation
              const res = await createLootBox();
              this.setState({
                  unlockCode: '',
                  title: '',
                  description: '',
                  effect: 'resurrect',
                  newTitle: '',
                  newLife: 'human',
              });
            }}>
            <Error error={error} />
            <fieldset className="fullwidth" disabled={loading} aria-busy={loading}>
              <h3>Create New Loot Box</h3>
                <label htmlFor="title">
                  Title
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    required
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="description">
                  Description
                  <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Description"
                    required
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                </label>

                <label htmlFor="effect">
                  Effect
                  <select
                    id="effect"
                    name="effect"
                    required
                    value={this.state.effect}
                    onChange={this.handleChange}
                  >
                    <option value="resurrect">Resurrect</option>
                    <option value="kill">Kill</option>
                    <option value="reverse">Reverse Life or Death</option>
                    <option value="givetitle">Give Title</option>
                  </select>
                </label>
                {this.state.effect == 'givetitle' && (
                  <div className="new-title">
                    <label htmlFor="newTitle">
                      New Title
                      <input
                        type="text"
                        id="newTitle"
                        name="newTitle"
                        placeholder="New Title"
                        required
                        value={this.state.newTitle}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label className="liferadio" htmlFor="newLife">
                      <input
                        type="radio"
                        id="newHuman"
                        name="newLife"
                        value="human"
                        checked={this.state.newLife == "human"}
                        onChange={this.handleChange}
                      />
                      <span>Human</span>
                    </label>
                    <label className="liferadio" htmlFor="newLife">
                      <input
                        type="radio"
                        id="newZombie"
                        name="newLife"
                        value="zombie"
                        checked={this.state.newLife == "zombie"}
                        onChange={this.handleChange}
                      />
                      <span>Zombie</span>
                    </label>

                  </div>
                )}

                <label htmlFor="unlockCode">
                  Unlock Code
                  <input
                    type="text"
                    id="unlockCode"
                    name="unlockCode"
                    placeholder="Unlock Code"
                    required
                    value={this.state.unlockCode}
                    onChange={this.handleChange}
                  />
                </label>
              <div className="submit-container">
                <button type="submit">Submit</button>
              </div>
            </fieldset>
          </Form>
          <ListLootBoxes />
          </>
        )}
      </Mutation>
    );
  }
}

export default CreateLootBox;
export { CREATE_LOOTBOX_MUTATION };
