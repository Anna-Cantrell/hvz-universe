import styled from 'styled-components';

const HeaderStyles = styled.div`
  background: linear-gradient(270deg, #cf3be4, #4560d8, #45e4e4, #4560d8, #cf3be4, #45e4e4);
  background-size: 300% 300%;
  &.zombie {
    background: linear-gradient(270deg, #DC143C, #222, #DC143C, #FB6C9D, #DC143C, #222);
    background-size: 300% 300%;
  }

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
  min-height: 60px;
  padding-top: 6px;
  box-sizing: border-box;
  @media (min-width: ${props => props.theme.tablet}) {
    min-height: 94px;
    padding-top: 10px;
  }
  .bar {
    height:70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 0;
    @media (min-width: ${props => props.theme.tablet}) {
      height:84px;
    }
    .nav-container {
      display: flex;
      height: 100%;
      align-items: center;
      padding-top: 29px;
      width: 100%;
      @media (min-width: ${props => props.theme.tablet}) {
        width: auto;
        padding-top: 0px;
      }
      .logo {
        background: ${props => props.theme.black};
        box-sizing: border-box;
        border-right: 2px solid ${props => props.theme.darkgray};
        display: flex;
        align-items: center;
        padding: 0 20px;
        position: absolute;
        height: 30px;
        width: 100%;
        top: 0;
        justify-content: center;
        img {
          height: calc(100% - 7px);
        }
        @media (min-width: ${props => props.theme.tablet}) {
          position: relative;
          width: auto;
          height: 100%;
          img {
            height: calc(100% - 45px);
          }
        }
        @media (min-width: ${props => props.theme.desktop}) {
          img {
            height: calc(100% - 20px);
          }
        }
      }
    }
    .profile-container {
      position: relative;
      flex: 1 0 auto;
      height: 100%;
      background: ${props => props.theme.black};
      padding-right: 20px;
      display: none;
      align-items: center;
      justify-content: flex-end;
      @media (min-width: ${props => props.theme.tablet}) {
        display: flex;
      }
      .profile {
        color: #fff;
        height: 44px;
        width: 44px;
        border-radius: 50%;
        background-color: ${props => props.theme.darkgray};
        align-items: center;
        justify-content: center;
        overflow: hidden;
        display: none;
        &:hover {
          cursor: pointer;
        }
        @media (min-width: ${props => props.theme.tablet}) {
          display: flex;
        }
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }

      .data-tray {
        display: none;
        position: absolute;
        top: calc(100% - 10px);
        list-style: none;
        text-align: right;
        background: #fff;
        padding: 0;
        z-index: 1;
        box-shadow: 0 0 6px -2px #999;
        margin: 0;
        li {
          padding: 10px 40px;
          text-align: center;
          &:not(:last-child) {
            border-bottom: 1px solid #ebebeb;
          }
          a {
            text-transform: lowercase;
            color: ${props => props.theme.black};
            ${props => props.theme.fontBold};
          }
          button {
            width: 100%;
            border: none;
            appearance: none;
            -webkit-appearance: none;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
`;

export default HeaderStyles;

export const NavStyles = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  a {
    flex: 1 0;
    padding: 0px 9px;
    font-size: 14px;
    text-transform: uppercase;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.lightgray};
    text-decoration: none;
    ${props => props.theme.fontMedium}
    border-right: 2px solid ${props => props.theme.darkgray};
    background: ${props => props.theme.black};
    transition: background-color .3s;
    &:hover, &:focus {
      border-color: transparent;
      background: transparent;
      cursor: pointer;
    }
    @media (min-width: 350px) {
      padding: 0px 10px;
      font-size: 15px;
    }
    @media (min-width: ${props => props.theme.tablet}) {
      padding: 0px 20px;
      font-size: 16px;
    }
    @media (min-width: ${props => props.theme.desktop}) {
      padding: 0px 30px;
    }
  }
`;
