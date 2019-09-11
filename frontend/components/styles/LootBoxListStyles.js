import styled from 'styled-components';

const LootBoxListStyles = styled.div`
  width: 100%;
  .lootbox-container {
    background: #fff;
    padding: 15px;
    border: 2px solid ${props => props.theme.purple};
    .title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 15px;
      span {
        font-weight: 300;
        font-size: 16px;
      }
    }
    .description {
      margin-bottom: 10px;
    }

    .deleteBox {
      background: transparent;
      border: none;
      color: ${props => props.theme.darkgray};
      font-weight: 700;
      padding: 0;
      margin-top: 0px;
      margin-left: auto;
      color: darkred;
      display: block;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

export default LootBoxListStyles;
