import styled from 'styled-components';

const PlayerPageStyles = styled.div`
  position: relative;
  width: 960px;
  max-width: 100%;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 0 6px -2px #999;
  padding: 20px;
  margin-bottom: 75px;
  margin-top: 75px;
  @media (min-width: ${props => props.theme.tablet}) {
    margin-top: 50px;
  }
  .editbutton {
    position: absolute;
    left: 10px;
    bottom: -50px;
    @media (min-width: ${props => props.theme.tablet}) {
      bottom: -50px;
    }
    &:hover {
      cursor: pointer;
    }
    button {
      appearance: none;
      -webkit-appearance: none;
      border: 1px solid ${props => props.theme.purple};
      padding: 4px 8px;
      text-transform: uppercase;
      letter-spacing: .08em;
      font-size: 12px;
      color: #555;
      background: #fff;
      transition: all .2s;
      ${props => props.theme.fontBold}
      &:hover {
        cursor: pointer;
        background: ${props => props.theme.purple};
        color: #fff;
      }
    }
  }

  .profile-container {
    @media (min-width: ${props => props.theme.tablet}) {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .profile-image-container {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin: -90px auto 15px;
      max-width: 200px;
      box-shadow: 0 0 6px -2px #999;
      overflow: hidden;
      @media (min-width: ${props => props.theme.tablet}) {
        box-shadow: none;
        margin: 0;
        width: 33.3%;
        max-width: none;
      }
      &:after {
        content: '';
        display: block;
        padding-bottom: 100%;
      }
      img {
        width: 100%;
        display: block;
        position: absolute;
      }
    }

    .profile-info-container {
      width: 100%;
      text-align: center;
      @media (min-width: ${props => props.theme.tablet}) {
        width: calc(66.6% - 20px);
      }
      .profile-status-bar {
        text-transform: uppercase;
        display: flex;
        justify-content: center;
        align-items: center;
        ${props => props.theme.fontBold}
        .status {
          font-size: 16px;
        }
        .title {
          font-size: 13px;
          color: ${props => props.theme.darkgray};
          margin-left: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid ${props => props.theme.darkgray};
          padding: 1px 4px;
        }
      }
      p {
        width: 100%;
        text-align: center;
        margin: 0 auto;
        &.username {
          font-size: 22px;
          ${props => props.theme.fontBold}
          margin: 12px auto 20px;
        }
        &.name {
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: .1em;
          ${props => props.theme.fontBold}
          color: #555;
        }
        &.pronouns {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: .1em;
          color: #555;
        }
      }
      .killcount {
        width: 100%;
        margin-top: 30px;
        border-top: 1px solid ${props => props.theme.lightgray};
        padding: 20px 0;
        ${props => props.theme.fontBold}
        color: ${props => props.theme.darkgray};
        .title {
          text-transform: uppercase;
          font-size: 14px;
        }
        .count {
          font-size: 26px;
        }
      }
      .codeToggle {
        margin: 50px auto 10px;
        border: 2px solid ${props => props.theme.purple};
        color: ${props => props.theme.purple};
        background: transparent;
        padding: 10px 20px;
        text-transform: uppercase;
        font-size: 20px;
        ${props => props.theme.fontBold}
        letter-spacing: .08em;
      }
    }

  }
`;

export default PlayerPageStyles;
