import styled from 'styled-components';

const PaginationStyles = styled.div`
  width: 100%;
  text-align: center;
  padding: 20px 0;
  p { margin: 0 20px; }
  a.btn {
    font-style: italic;
    font-size: 14px;
  }
  .pagination-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default PaginationStyles;
