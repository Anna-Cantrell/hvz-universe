import styled from 'styled-components';

const PageEditorStyles = styled.div`
  .page-title {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    h1, h2, h3 { margin-right: 20px; margin-bottom: 0;}
  }
  .demo-wrapper, .rdw-editor-wrapper {
    background: #fff;
    box-shadow: 0 0 5px -2px #999;
  }
  .editer-content, .rdw-editor-main {
    padding: 0px 20px 10px;
    min-height: 200px;
  }
  .editer-content {
    max-height: 350px;
  }
`;

export default PageEditorStyles;
