import styled from 'styled-components';

const PopupStyles = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0,0,0,0.6);
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  form {
    margin: 0;
    fieldset {
      background: #fff;
      padding: 30px;
      text-align: center;
      button.close {
        appearance: none;
        -webkit-appearance: none;
        border: none;
        font-size: 30px;
        position: absolute;
        background: transparent;
        right: 20px;
        top: 10px;
        cursor: pointer;
      }
      h2 {
        margin-bottom: 35px;
      }
      label {
        font-size: 11px;
        color: #999;
        text-align: center;
        display: block;
        width: 100%;
        margin-bottom: 20px;
        input {
          border-color: ${props => props.theme.purple};
        }
      }
    }

    &.zombie {
      fieldset {
        &:before {
          background: linear-gradient(270deg, #DC143C, #222, #DC143C, #FB6C9D, #DC143C, #222);
          background-size: 200% 200%;
        }
      }
    }

  }
`;

export default PopupStyles;
