import styled from 'styled-components';

const PlayerListStyles = styled.div`
  width: 100%;
  margin: 0px auto;
  border-bottom: 2px solid #ebebeb;
  @media (min-width: ${props => props.theme.desktop}) {
    margin: 0;
  }
  .link-container {
    position: relative;
    display: flex;
    color: ${props => props.theme.black};
    .info-container, .count {
      padding: 10px 0;
    }
    .image-container {
      align-self: center;
      width: 45px;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 15px;
      img { width: 100%; height: 100%; object-fit: cover; }
    }

    .info-container {
      margin-left: 15px;
      padding-left: 15px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      flex: 1 0;
      line-height: 1.2;
      border-left: 2px solid #ebebeb;
      div, span { width: 100%; display: block; }
      div {
        font-size: 14px;
      }
      .meta {
        font-size: 13px;
      }
    }

    .count {
      position: relative;
      border-left: 2px solid #ebebeb;
      padding: 0 5px;
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      span {
        top: 0;
        width: 100%;
        display: block;
        text-align: center;
        font-size: 13px;
        ${props => props.theme.fontBold}
      }
    }
  }
`;

export default PlayerListStyles;
