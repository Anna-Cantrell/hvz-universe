import styled from 'styled-components';

const FooterStyles = styled.div`
  width: 100%;
  background: ${props => props.theme.black};
  .nav-container a {
    padding: 10px 8px;
  }
  .subfooter {
    display: flex;
    color: #fff;
    justify-content: space-between;
    padding: 20px;
    flex-wrap: wrap;
    a.logo {
      height: 50px;
      width: 100%;
      @media (min-width: ${props => props.theme.tablet}) {
        width: 50%;
        height: 70px;
      }
      img {
        height: 100%;
        display: block;
        margin: 0 auto;
        @media (min-width: ${props => props.theme.tablet}) {
          margin: 0;
        }
      }
    }
    .footer-info {
      text-align: center;
      width: 100%;
      margin-top: 10px;
      @media (min-width: ${props => props.theme.tablet}) {
        text-align: right;
        width: 50%;
        margin: 0;
      }
      p {
        color: #ebebeb;
        font-size: 13px;
        margin: 0;
      }
    }
  }
`;
export default FooterStyles;
