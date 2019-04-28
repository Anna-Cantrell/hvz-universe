import styled from 'styled-components';

const HeaderStyles = styled.div`
  background: linear-gradient(270deg, #cf3be4, #4560d8, #45e4e4, #4560d8, #cf3be4, #45e4e4);
  background-size: 300% 300%;

  -webkit-animation: galaxyThrust 40s ease infinite;
  -moz-animation: galaxyThrust 40s ease infinite;
  animation: galaxyThrust 40s ease infinite;

  @-webkit-keyframes galaxyThrust {
    0%{background-position:0% 51%}
    50%{background-position:100% 50%}
    100%{background-position:0% 51%}
  }
  @-moz-keyframes galaxyThrust {
    0%{background-position:0% 51%}
    50%{background-position:100% 50%}
    100%{background-position:0% 51%}
  }
  @keyframes galaxyThrust {
    0%{background-position:0% 51%}
    50%{background-position:100% 50%}
    100%{background-position:0% 51%}
  }
  min-height: 94px;
  padding-top: 10px;
  box-sizing: border-box;
  .bar {
    height:84px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 0;
    .nav-container {
      display: flex;
      height: 100%;
      align-items: center;
      .logo {
        background: ${props => props.theme.black};
        box-sizing: border-box;
        height: 100%;
        border-right: 2px solid ${props => props.theme.darkgray};
        display: flex;
        align-items: center;
        padding: 0 20px;
        img {
          height: calc(100% - 20px);
        }
      }
    }
    .profile-container {
      flex: 1 0 auto;
      height: 100%;
      background: ${props => props.theme.black};
      padding-right: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .profile {
        color: #fff;
        height: 44px;
        width: 44px;
        border-radius: 50%;
        background-color: ${props => props.theme.darkgray};
      }
    }
  }
`;

export default HeaderStyles;

export const NavStyles = styled.div`
  height: 100%;
  display: flex;
  a {
    padding: 0px 30px;
    font-size: 16px;
    text-transform: uppercase;
    height: 100%;
    display: flex;
    align-items: center;
    color: ${props => props.theme.lightgray};
    text-decoration: none;
    ${props => props.theme.fontMedium}
    border-right: 2px solid ${props => props.theme.darkgray};
    background: ${props => props.theme.black};
    transition: background-color .3s;
    &:hover, &:focus {
      border: none;
      background: transparent;
      cursor: pointer;
    }
  }
`;
