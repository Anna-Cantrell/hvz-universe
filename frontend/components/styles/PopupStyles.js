import styled from 'styled-components';

const PopupStyles = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0,0,0,0.5);
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  fieldset {
    background: #fff;
  }
`;

export default PopupStyles;
