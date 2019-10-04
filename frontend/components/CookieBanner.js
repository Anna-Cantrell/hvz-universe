import React, { Component } from 'react';
import CookieBannerStyles from './styles/CookieBannerStyles';


class CookieBanner extends Component {
  state = {
    hidden: true
  }
  acceptCookies = () => {
    document.cookie = "cookieaccept=true;max-age=31536000";
    this.setState({hidden: true});
  }
  componentDidMount() {
    if(document.cookie.indexOf("cookieaccept=true") === -1) {
      this.setState({hidden: false});
    }
  }
  render () {
    if(this.state.hidden) return "";
    return (
      <CookieBannerStyles>
      <div className="cookiebanner-container">
      <p>This site uses cookies to keep you logged in and make gameplay possible. By clicking "Use Cookies" or continuing to use this site you are agreeing to the use of cookies by this website. To learn more please <a href="privacy-policy">read our privacy policy.</a> 💚</p><button onClick={this.acceptCookies}>Use Cookies</button>
      </div>
      </CookieBannerStyles>
    );
  }
}

export default CookieBanner;
