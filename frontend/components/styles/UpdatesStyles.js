import styled from 'styled-components';

const UpdatesContainer = styled.div`
  width: 100%;
  background: #fff;
  margin: 20px auto;
  box-shadow: 1px 1px 7px -4px #555;
  @media (min-width: ${props => props.theme.desktop}) {
    width: calc(80% - 40px);
    margin: 0;
  }
  .updates-intro, .update-list-container {
    padding: 20px;
  }
  .updates-intro {
    border-bottom: 2px solid #ebebeb;
    p {
      margin: 8px 0 0 0;
    }
  }

  .update-list-container {
    background: #fff;
  }
  .load_more {
    width: 100%;
    text-align: center;
    padding: 25px;
    .btn {
      padding: 8px 30px;
      font-size: 16px;
    }
  }
`;

export default UpdatesContainer;

export const SingleUpdateStyles = styled.div`
  width: 100%;
  position: relative;
  background: #fff;
  padding: 15px 20px;
  border-bottom: 2px solid #ebebeb;
  .deleteUpdate {
    position: absolute;
    right: 20px;
    bottom: 20px;
    background: transparent;
    border: none;
    padding: none;
    font-weight: 700;
    text-transform: uppercase;
    color: darkred;
    letter-spacing: .08em;
    font-size: 10px;
    &:hover {
      cursor: pointer;
    }
  }
`;
