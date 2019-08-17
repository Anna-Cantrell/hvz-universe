import styled from 'styled-components';

const SigninStyles = styled.div`
background-image: url('../../static/temp-bg.jpg');
background-size: cover;
background-position: center;
  .wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 20px;
    .hero-text {
      width: 100%;
      text-align: center;
      h1 {
        text-transform: uppercase;
        font-size: 40px;
      }
      h2 {
        margin-top: 5px;
        font-size: 26px;
        font-weight: 400;
      }
      p {
        font-weight: 900;
      }
      @media (min-width: ${props => props.theme.tablet}) {
        width: 50%;
        padding-left: 40px;
        padding-top: 40px;
        text-align: left;
        h1 {
          font-size: 60px;
        }
        h2 {
          font-size: 44px;
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
