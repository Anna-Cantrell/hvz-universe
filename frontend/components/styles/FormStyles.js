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
  left: 0;
  display: flex;
  margin: 20px auto;
  box-shadow: 0px 0px 12px -7px #333;
  @media (min-width: ${props => props.theme.tablet}) {
    flex-wrap: nowrap;
  }
  fieldset {
    position: relative;
    border: 0;
    margin: 0;
    background: #fff;
    width: 100%;
    &.fullwidth {
      label {
        width: 100%;
      }
    }
    h2 {
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 5px;
    }
    p {
      margin-top: 5px;
      text-align: center;
    }
    .fields-container {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      justify-content: space-between;
      padding-top: 20px;
      label {
        margin: 0;
      }
      &.signin {
        label {
          width: 100%;
        }
      }
    }
    label {
      position: relative;
      padding: 8px 0;
      width: calc(50% - 10px);
      font-size: 12px;
      letter-spacing: .05em;
      text-transform: uppercase;
      color: ${props => props.theme.darkgray};
      ${props => props.theme.fontBold}
      &.liferadio {
        text-align: center;
        span {
          pointer-events: none;
        }
      }
      &.file {
        width: 100%;
      }
    }
    input {
      width: 100%;
      padding: 10px;
    }
    .media-container {
      width: 100%;
      display: flex;
      align-items: center;
      border: 1px solid #ccc;
      padding: 0 10px;
    }
    input[type="file"] {
      padding: 10px 0;
      width: calc(100% - 30px);
    }
    .image-preview {
      height: 30px;
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
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
    .submit-container {
      margin: 10px 0;
      width: 100%;
      text-align: center;
    }
    button[type="submit"] {
      text-transform: uppercase;
      background-color: #fff;
      border: 2px solid ${props => props.theme.purple};
      padding: 12px 20px;
      box-shadow: 2px 2px 7px -5px #222;
      transition: all .2s;
      font-size: 16px;
      ${props => props.theme.fontBold}
      &:hover {
        cursor: pointer;
        background: ${props => props.theme.purple};
        color: #fff;
      }
    }
    .form-smol {
      display: block;
      width: 100%;
      font-size: 13px;
      margin-top: 8px;
      a {
        display: block;
      }
    }
  }

  &.updateplayerform {
    max-width: 720px;
    margin: 30px auto;
    h3 {
      margin-bottom: 8px;
    }
    .backbutton {
      display: block;
      margin-bottom: 30px;
      button {
        border: 1px solid #ccc;
        border-radius: 0px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    label.file {
      display: flex;
      flex-wrap: wrap;
      div { width: 100%; }
      img {
        max-height: 50px;
        display: block;
        margin-bottom: 20px;
        display: inline-block;
        margin-right: 10px;
      }
      input {
        width: auto;
      }
    }
    input {
      margin-bottom: 10px;
    }
    button[type="submit"] {
      margin-top: 20px;
    }

    .admin-area {
      margin-top: 20px;
      border-top: 1px solid #999;
      padding-top: 20px;
    }
  }
`;
export default Form;
