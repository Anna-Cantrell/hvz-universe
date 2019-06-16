import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap-reverse;
  @media (min-width: ${props => props.theme.tablet}) {
    flex-wrap: nowrap;
  }
`;
