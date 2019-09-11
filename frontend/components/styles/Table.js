import styled from 'styled-components';

const Table = styled.table`
  border-spacing: 0;
  width: 100%;
  font-size: 14px;
  box-shadow: 0 0 6px -2px #999;
  thead {
    font-size: 10px;
  }
  th { background: #fff; }
  td,
  th {
    border-bottom: 1px solid ${props => props.theme.offWhite};
    border-right: 1px solid ${props => props.theme.offWhite};
    position: relative;
    padding: 5px;
    &:last-child {
      border-right: none;
      width: 150px;
      button {
        width: 100%;
      }
    }
    label {
      padding: 10px 5px;
      display: block;
    }
  }
  tr {
    background: #f5d6f9;
    transition: all .2s;
    &:nth-child(2n) { background: #f9e7fc; }
    &:hover {
      background: ${props => props.theme.offWhite};
    }
  }
`;

export default Table;
