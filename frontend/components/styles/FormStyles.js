import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100% 100%;
  }
`;

const Form = styled.form`
  width: 100%;
  position: relative;
  display: flex;
  margin: 20px auto;
  @media (min-width: ${props => props.theme.tablet}) {
    flex-wrap: nowrap;
  }
  fieldset {
    position: relative;
    border: 0;
    background: #efefef;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    label {
      padding: 10px 0;
    }
    input {
      width: 100%;
      padding: 10px;
    }
    &[disabled] {
      opacity: .5;
    }
    &:before {
      content: '';
      height: 10px;
      width: 100%;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(270deg, #cf3be4, #4560d8, #45e4e4, #cf3be4);
    }
    &[aria-busy='true']:before {
      background-size: 50% auto;
      animation: ${loading} 1s linear infinite;
    }
  }
`;
export default Form;
