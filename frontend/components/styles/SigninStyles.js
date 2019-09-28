import styled from 'styled-components';

const SigninStyles = styled.div`
background-image: url('../../static/hero-3.jpg');
background-size: cover;
background-position: center;
  .wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 20px;
    margin: 0 auto;
    .hero-text {
      width: 100%;
      text-align: center;
      h1 {
        text-transform: uppercase;
        font-size: 40px;
        line-height: 1;
        span {
          text-transform: lowercase;
        }
      }
      h2 {
        margin-top: 5px;
        font-size: 26px;
        font-weight: 400;
        line-height: 1;
        margin-bottom: 0px;
      }
      span.date {
        display: block;
        text-transform: uppercase;
        letter-spacing: .08em;
        margin-top: 10px;
        font-weight: 600;
        font-size: 14px;
      }
      ul.features {
        -webkit-padding-start: 0px;
        list-style: none;
        li {
          padding: 8px 0;
          font-style: italic;
          font-weight: 500;
        }
      }
      p {
        font-weight: 900;
      }
      @media (min-width: ${props => props.theme.tablet}) {
        width: 50%;
        padding-left: 40px;
        padding-top: 30px;
        text-align: left;
        h1 {
          font-size: 60px;
          span {
            font-size: 55px;
          }
        }
        h2 {
          font-size: 36px;
        }
        ul.features li {
          position: relative;
          padding-left: 20px;
          &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 15px;
            height: 3px;
            width: 7px;
            background: ${props => props.theme.purple};
          }
        }
        p {
          font-size: 18px;
          font-weight: 900;
        }
      }
    }

    .form-container {
      width: 100%;
      @media (min-width: ${props => props.theme.tablet}) {
        width: 40%;
        display: flex;
        justify-content: center;
        form {
          max-width: 450px;
        }
      }
    }
  }
`;
export default SigninStyles;
