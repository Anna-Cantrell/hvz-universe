import React, { Component } from 'react';
import PageEditor from './PageEditor';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const PAGES_QUERY = gql`
  query PAGES_QUERY {
    pages {
      id
      title
      content
    }
  }
`;



class AdminPages extends Component {
  state = {
    page: "",
    id: "",
  }
  changeState = (e, id, content) => {
    this.setState({
      page: e.target.value,
      id,
      content
    });
  }

  render() {
    return (
      <Query query={PAGES_QUERY}>
      { ({data, error, loading}) => {
        if(loading) return <p>loading...</p>;
        if(error) return <p>Error: {error.message}</p>;
        return (
          <div>
            <h1>Pages!</h1>
            {data.pages.map(page => (
              <label key={page.title} htmlFor={page.title}>
                {page.title}
                <input
                type="radio"
                id={page.title}
                checked={page.title == this.state.page}
                name="page"
                onChange={(e) => { this.changeState(e, page.id, page.content) } }
                value={page.title} />
              </label>
            ))}
            {data.pages.map(page => (
              <div key={page.id}>
                {this.state.page == page.title && <PageEditor content={page.content} id={page.id} page={page.title} />}
              </div>
            ))}
          </div>
        );
      } }
      </Query>
    );
  }
};

export default AdminPages;
export { PAGES_QUERY }
