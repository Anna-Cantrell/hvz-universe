import styled from 'styled-components';

const CookieBannerStyles = styled.div`
  position: fixed;
  bottom: 0;
  background: rgba(20,0,60,0.9);
  width: 100%;
  z-index: 999999;
  color: #fff;
  .cookiebanner-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px 20px;
    @media(min-width:${props => props.theme.tablet}) {
      flex-wrap: nowrap;
    }
    p {
      font-size: 13px;
      @media(min-width:${props => props.theme.tablet}) {
        max-width: 78%;
        font-size: 14px;
      }
    }
    a {
      color: pink;
    }
    button {
      display: block;
      padding: 10px 20px;
      border: 2px solid pink;
      background: transparent;
      color: pink;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: .08em;
      font-weight: 700;
      transition: all .2s;
      margin: 0 auto;
      @media(min-width:${props => props.theme.tablet}) {
        font-size: 14px;
        margin-left: 20px;
      }
      &:hover {
        cursor: pointer;
        color: rgb(20,0,60);
        background: pink;
      }
    }
  }
`;

export default CookieBannerStyles;
