import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { EditorState, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { SimplePage } from './styles/GeneralStyles';
import Loading from './Loading';


const SINGLE_PAGE_QUERY = gql`
  query SINGLE_PAGE_QUERY($title: String!) {
    page(where: {title: $title}) {
      id
      title
      content
    }
  }
`;


class PageContent extends Component {
  state = {
    filterBy: ["HUMAN", "ZOMBIE"],
  }
  render () {
    return (
      <Query
        query={SINGLE_PAGE_QUERY}
        variables={{
          title: this.props.title,
        }}>
        {({error, loading, data}) => {
          if(loading) return <Loading />;
          if(error) return <p>Error: {error.message}</p>;

          const parsedContent = data.page.content ? stateToHTML(convertFromRaw(data.page.content)) : "coming soon";
          let decodeContent = parsedContent.replace(/&lt;/g, '<');
          decodeContent = decodeContent.replace(/&gt;/g, '>');
          return (
            <SimplePage>
              {console.log(decodeContent)}
              <div dangerouslySetInnerHTML={{ __html: decodeContent}}></div>
            </SimplePage>
          );
        } }
      </Query>

    );
  }
}

export default PageContent;
