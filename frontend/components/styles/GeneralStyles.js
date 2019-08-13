import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  @media (min-width: ${props => props.theme.desktop}) {
    flex-wrap: nowrap;
    padding: 20px;
    &.compressed {
      flex-wrap: wrap;
      padding: 0;
      margin: 0;
      max-width: none;
    }
  }
  &.admin-page {
    padding: 0px;
    min-height: 500px;
    align-items: normal;
    max-width: none;
  }
  strong { ${props => props.theme.fontBold} }
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
`;
