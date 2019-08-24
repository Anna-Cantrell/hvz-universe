import styled from 'styled-components';

export const SidebarStyles = styled.div`
  position: relative;
  text-align: left;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  @media (min-width: ${props => props.theme.desktop}) {
    flex-wrap: wrap;
    width: 20%;
    margin-right: 40px;
    > a {
      width: 100%;
    }
  }
  .main-sidebar {
    position: relative;
    width: 100%;
    background: #fff;
    box-shadow: 0 0 6px -2px #999;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    @media (min-width: ${props => props.theme.tablet}) {
      flex-wrap: nowrap;
      margin-bottom: 30px;
    }
    @media (min-width: ${props => props.theme.desktop}) {
      margin-bottom: 40px;
      margin-top: 10px;
      flex-wrap: wrap;
      > a {
        width: 100%;
      }
    }
  }

  .profile-container {
    width: 100%;
  }
  section.profile {
    display: inline-flex;
    flex-wrap: none;
    align-items: center;
    padding: 20px 15px;
    color: ${props => props.theme.black};
    text-decoration: none;
    border-bottom: 1px solid: #ccc;
    width: 100%;
    @media (min-width: ${props => props.theme.desktop}) {
      display: flex;
      padding: 30px 15px;
      width: 100%;
      flex-wrap: wrap;
    }
    .photo {
      position: relative;
      width: 50px;
      overflow: hidden;
      border-radius: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      @media (min-width: ${props => props.theme.desktop}) {
        width: 50%;
        margin: -48px auto 15px;
        box-shadow: 0 0 6px -2px #999;
      }
      &:after {
        content: '';
        display: block;
        padding-bottom: 100%;
        top: 0;
      }
      img {
        width: 100%;
        display: block;
        position: absolute;
      }
    }
    .info {
      width: 70%;
      padding-left: 15px;
      .username {
        font-size: 16px;
        word-break: break-all;
        ${props => props.theme.fontBold}
      }
      .title {
        font-size: 14px;
      }
      .meta {
        font-size: 12px;
      }
      @media (min-width: ${props => props.theme.desktop}) {
        width: 100%;
        padding: 0;
        text-align: center;
      }
    }
  }

  section.actions {
    position: relative;
    padding: 0px 15px 20px;
    display: inline-flex;
    flex-wrap: wrap;
    width: 100%;
    @media (min-width: ${props => props.theme.tablet}) {
      padding: 20px 15px;
    }
    @media (min-width: ${props => props.theme.desktop}) {
      padding: 30px 15px;
      display: flex;
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 10px;
      background: linear-gradient(to bottom, #dbdbdb, rgba(255,255,255, 0.0));
      display: none;
      @media (min-width: ${props => props.theme.desktop}) {
        display: block;
      }
    }

    .container {
      display: flex;
      width: 100%;
      align-items: center;
      @media (min-width: ${props => props.theme.desktop}) {
        flex-wrap: wrap;
      }
      a, & > button {
        flex: 1 0;
        margin: 0 6px;
        @media (min-width: 350px) {
          margin: 0 10px;
        }
        @media (min-width: ${props => props.theme.desktop}) {
          width: 100%;
          margin: 0 0 20px 0px;
          flex: none;
        }
      }
    }
  }

  .sidebar-trigger {
    background: ${props => props.theme.purple};
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 10px;
    cursor: pointer;
    display: none;
    &:before {
      content: '';
      position: absolute;
      height: 15px;
      width: 25px;
      left: calc(50% - 15px);
      bottom: 0;
      background: inherit;
      border-radius: 50%;
    }
    &:after {
      content: '\\0203A';
      position: absolute;
      font-size: 16px;
      bottom: -1px;
      color: #fff;
      font-weight: 900;
      transition: all .2s;
      transform: rotate(-90deg);
      left: calc(50% - 6px);
    }
    &.open:after {
      transform: rotate(90deg);
      left: calc(50% - 4px);
    }
    @media (min-width: ${props => props.theme.desktop}) {
      display: block;
    }
  }

  .twitter-feed {
    position: relative;
    height: 200px;
    overflow: scroll;
    width: 100%;
    background: #fff;
    box-shadow: 0 0 6px -2px #999;
    text-align: center;
    margin-bottom: 20px;
    a {
      opacity: 0;
      position: absolute;
    }
    div {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      ${props => props.theme.fontBold}
      color: #ebebeb;
      font-size: 30px;
      position: absolute;
      top: 0;
      z-index: 1;
    }
    iframe {
      z-index: 2;
      position: relative!important;
      width: 100%;
      max-width: 420px!important;
    }
    @media (min-width: ${props => props.theme.tablet}) {
      height: 210px;
    }
    @media (min-width: ${props => props.theme.desktop}) {
      height: 400px;
    }
  }


  &.compressed {
    @media (min-width: ${props => props.theme.desktop}) {
      width: 100%;
      margin-right: 0px;
    }
    .main-sidebar {
      @media (min-width: ${props => props.theme.desktop}) {
        margin-bottom: 30px;
        flex-wrap: nowrap;
        justify-content: space-between;
        margin-top: 0px;
        > a {
          width: 50%;
        }
      }
    }

    .profile-container {
      width: 100%;
    }

    section.profile {
      @media (min-width: ${props => props.theme.desktop}) {
        display: inline-flex;
        padding: 10px 15px;
        width: 100%;
        text-align: left;
      }
      .photo {
        @media (min-width: ${props => props.theme.desktop}) {
          width: 50px;
          margin: 0;
        }
      }
      .info {
        @media (min-width: ${props => props.theme.desktop}) {
          padding-left: 15px;
          text-align: left;
          width: 70%;
        }
      }
    }

    section.actions {
      @media (min-width: ${props => props.theme.desktop}) {
        padding: 20px 15px;
        display: inline-flex;
        max-width: 400px;
      }
      &:before {
        @media (min-width: ${props => props.theme.desktop}) {
          display: none;
        }
      }

      .container {
        @media (min-width: ${props => props.theme.desktop}) {
          flex-wrap: nowrap;
        }
        a, button {
          @media (min-width: ${props => props.theme.desktop}) {
            width: auto;
            margin: 0 10px;
            flex: 1 0;
          }
        }
      }
    }

    .sidebar-trigger {
      @media (min-width: ${props => props.theme.desktop}) {
        display: none;
      }
    }

    .twitter-feed {
      display: none;
    }
  }



  &.admin-sidebar {
    @media (min-width: ${props => props.theme.desktop}) {
      max-width: 280px;
    }
    .main-sidebar {
      margin-top: 0;
      padding: 20px;
      margin-bottom: 0;
      display: block;
      list-style: none;
      li {
        font-size: 12px;
        letter-spacing: .05em;
        text-transform: uppercase;
        border-bottom: 1px solid #ebebeb;
        &.active {
          a {
            color: ${props => props.theme.pink};
          }
        }
        a {
          display: block;
          padding: 15px 10px;
          color: #555;
          ${props => props.theme.fontBold}
          transition: all .3s;
          &:hover {
            color: ${props => props.theme.pink};
          }
        }
      }
    }
  }
`;
