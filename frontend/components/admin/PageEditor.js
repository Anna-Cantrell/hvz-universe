import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { stateToHTML } from 'draft-js-export-html';

import { PAGES_QUERY } from './AdminPages';
import PageEditorStyles from '../styles/PageEditorStyles';

const UPDATE_PAGE_MUTATION = gql`
  mutation UPDATE_PAGE_MUTATION( $id: ID!, $title: String, $content: Json ) {
    updatePage( id: $id, title: $title, content: $content ) {
      title
      content
    }
  }
`;

class PageEditor extends Component {
  state = {
    id: this.props.id,
    editorState: this.props.content ? EditorState.createWithContent(convertFromRaw(this.props.content)) : EditorState.createEmpty(),
  }

  onChange = (editorState) => {
    this.setState({editorState});
  };

  render() {
    let { page, id } = this.props;
    return (
      <Mutation
        mutation={UPDATE_PAGE_MUTATION}
        variables={{
          id: this.state.id,
          content: convertToRaw(this.state.editorState.getCurrentContent()),
        }}
        refetchQueries={[{ query: PAGES_QUERY }]}
        >
        {(updatePage, { loading, error }) => (
          <PageEditorStyles>
            <div className="page-title">
              <h2>The {page} Page</h2>
              <button
                className="btn"
                onClick={updatePage}
                disabled={loading}>Updat{loading ? 'ing' : 'e'}</button>
            </div>
            <Editor
              editorState={this.state.editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="editer-content"
              onEditorStateChange={this.onChange} />
          </PageEditorStyles>
        )}
      </Mutation>
    );
  }
};

export default PageEditor;
