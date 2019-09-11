import React, { Component } from 'react';
import CreateUpdate from './CreateUpdate';
import CreateLootBox from './CreateLootBox';
import Signup from '../Signup';
import UpdateCurrencyNameOne from './UpdateCurrencyNameOne';
import UpdateCurrencyNameTwo from './UpdateCurrencyNameTwo';
import UpdateCurrencyNameThree from './UpdateCurrencyNameThree';
import ListCurrencies from '../ListCurrencies';
import { PageContainer } from '../styles/GeneralStyles';
import AdminPagesStyles from '../styles/AdminPagesStyles';


class CustomUpdates extends Component {
  state = {
    page: "lootboxes",
  }
  changeState = (e) => {
    this.setState({ page: e.target.value });
  }
  renderPage = () => {
    switch(this.state.page) {
      case "lootboxes": return <CreateLootBox />; break;
      case "currencies": return <><UpdateCurrencyNameOne /><UpdateCurrencyNameTwo /><UpdateCurrencyNameThree /><ListCurrencies /></>; break;
      case "newplayers": return <Signup page="admin" />; break;
      default: return <CreateUpdate />; break;
    }
  }
  render() {
    let pages = ["Loot Boxes", "updates", "New Players"];
    return (
      <AdminPagesStyles>
      <h2>Custom Admin Updates</h2>
      <p>Hark and behold your power. Wield it responsibly.</p>
      <form className="selection">
        {pages.map(page => (
          <label key={page.replace(/\s/g, '').toLowerCase()} htmlFor={page.replace(/\s/g, '').toLowerCase()}>
            <input type="radio" id={page.replace(/\s/g, '').toLowerCase()} checked={page.replace(/\s/g, '').toLowerCase() == this.state.page} name="page" onChange={(e) => { this.changeState(e) } } value={page.replace(/\s/g, '').toLowerCase()} />
            <span>{page}</span>
          </label>
        ))}
      </form>
      {this.renderPage()}
      </AdminPagesStyles>
    );
  }
};

export default CustomUpdates;
