import styled from 'styled-components';

export const SidebarStyles = styled.div`
  text-align: left;
  width: 100%;
  background: ${props => props.theme.lightgray};
  @media (min-width: ${props => props.theme.tablet}) {
    width: 25%;
    margin-right: 40px;
  }
`;
