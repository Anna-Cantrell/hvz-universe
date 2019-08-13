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
`;

export default UpdatesContainer;

export const SingleUpdateStyles = styled.div`
  width: 100%;
  position: relative;
  background: #fff;
  padding: 15px 20px;
  border-bottom: 2px solid #ebebeb;
`;
