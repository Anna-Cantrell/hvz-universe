import styled from 'styled-components';

const AdminPagesStyles = styled.div`
  h2 {
    margin-top: 0px;
  }
  form.selection {
    max-width: 100%;
    margin: 0 0 30px;
  }
  label {
    padding: 10px 20px;
    position: relative;
    display: inline-block;
    color: ${props => props.theme.purple};
    text-transform: uppercase;
    margin: 10px 15px 0 0;
    &:hover {
      cursor: pointer;
    }
    &.page-radio {
      margin-bottom: 20px;
    }
    span {
      position: relative;
      transition: all .2s;
      ${props => props.theme.fontBold}
      font-size: 14px;
      letter-spacing: .08em;
    }
    input[type="radio"] {
      position: absolute;
      appearance: none;
      -webkit-appearance: none;
      border-radius: 0px;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      border: 2px solid ${props => props.theme.purple};
      margin: 0;
      transition: all .2s;
      &:checked {
        background: ${props => props.theme.purple};
        & + span {
          color: #fff;
        }
      }
    }
  }
`;

export default AdminPagesStyles;
