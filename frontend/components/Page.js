import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Meta from '../components/Meta';
import CookieBanner from '../components/CookieBanner';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';

const theme = {
  black: '#1d1528',
  pink: '#cf3be4',
  blue: '#4560d8',
  teal: '#45e4e4',
  purple: '#9286e4',
  lightgray: '#cccccc',
  offWhite: '#efefef',
  darkgray: '#383838',
  background: '#f6f0f7',
  maxWidth: '1240px',
  boxShadow: '0 12px 24px 0 rgba(0, 0, 0, 0.9)',
  fontRegular: 'font-weight: 400; font-style: normal;',
  fontMedium: 'font-weight: 500; font-style: normal;',
  fontBold: 'font-weight: 700; font-style: normal;',
  fontBoldItalic: 'font-weight: 700; font-style: italic;',
  fontBlackItalic: 'font-weight: 900; font-style: italic;',
  tablet: '680px',
  desktop: '940px',
};
const StyledPage = styled.div`
  color: ${props => props.theme.black};
`;
const Inner = styled.div`
  width: 100%;
  margin: 0 auto;
`;

injectGlobal`
  html, body {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: montserrat, sans-serif;
    background: #f6f0f7;
  }
  a {
    text-decoration: none;
  }
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: inherit;
  }
  .wrapper {
    max-width: 1280px;
  }
  h1 {
    margin: 0;
    font-weight: 900;
    font-style: italic;
  }
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>
            {this.props.children}
          </Inner>
          <Footer />
          <CookieBanner />
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
