import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  min-height: 100vh;
  @media (min-width: ${props => props.theme.desktop}) {
    display: flex;
    align-items: flex-start;
    flex-wrap: nowrap;
    padding: 20px;
    &.compressed {
      display: block;
      flex-wrap: wrap;
      padding: 0;
      margin: 0;
      max-width: none;
    }
  }
  strong { ${props => props.theme.fontBold} }
  form {
    max-width: 400px;
    margin: 0 30px;
  }
  .btn {
    text-transform: uppercase;
    background-color: #fff;
    border: 2px solid ${props => props.theme.purple};
    padding: 5px 10px;
    box-shadow: 2px 2px 7px -5px #222;
    transition: all .2s;
    ${props => props.theme.fontBold}
    &:hover {
      cursor: pointer;
      background: ${props => props.theme.purple};
      color: #fff;
    }
  }

  &.admin-page {
    padding: 0px;
    min-height: 500px;
    align-items: normal;
    max-width: none;
    main {
      @media (min-width: ${props => props.theme.desktop}) {
        width: calc(100% - 320px);
        padding: 40px 20px;
      }
    }
  }
  .signin-container {
    margin: 0 auto;
  }
`;

export const SimplePage = styled.div`
  background: #fff;
  width: 100%;
  padding: 20px;
  min-height: 100%;
  box-shadow: 0 0 6px -2px #999;
  @media (min-width: ${props => props.theme.tablet}) {
    margin: 0 auto;
    padding: 30px;
    width: calc(80% - 40px);
    margin-bottom: 20px;
  }
`;
