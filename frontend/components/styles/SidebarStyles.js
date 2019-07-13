import styled from 'styled-components';

export const SidebarStyles = styled.div`
  position: relative;
  text-align: left;
  width: 100%;
  background: #fff;
  box-shadow: 0 0 6px -2px #999;
  @media (min-width: ${props => props.theme.tablet}) {
    width: 25%;
    margin-right: 40px;
  }

  section.profile {
    display: flex;
    flex-wrap: none;
    align-items: center;
    padding: 30px 15px;
    color: ${props => props.theme.black};
    text-decoration: none;
    border-bottom: 1px solid: #ccc;
    .photo {
      position: relative;
      width: 33%;
      overflow: hidden;
      border-radius: 50%;
      height: 100%;
      display: flex;
      align-items: center;
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
      width: 66%;
      padding-left: 15px;
      .username {
        font-size: 16px;
        ${props => props.theme.fontBold}
      }
      .title {
        font-size: 14px;
      }
      .meta {
        font-size: 12px;
      }
    }
  }

  section.actions {
    position: relative;
    padding: 30px 15px;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 10px;
      background: linear-gradient(to bottom, #dbdbdb, rgba(255,255,255, 0.0));
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
  }
`;
