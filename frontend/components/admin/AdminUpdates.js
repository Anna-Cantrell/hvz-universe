import React, { Component } from 'react';
import CreateUpdate from './CreateUpdate';
import CreateLootBox from './CreateLootBox';
import CreatePlayer from './CreatePlayer';
import UpdateCurrencyNameOne from './UpdateCurrencyNameOne';
import UpdateCurrencyNameTwo from './UpdateCurrencyNameTwo';
import UpdateCurrencyNameThree from './UpdateCurrencyNameThree';
import ListCurrencies from '../ListCurrencies';
import { PageContainer } from '../styles/GeneralStyles';


class CustomUpdates extends Component {
  state = {
    page: "updates",
  }
  changeState = (e) => {
    this.setState({ page: e.target.value });
  }
  renderPage = () => {
    switch(this.state.page) {
      case "lootboxes": return <CreateLootBox />; break;
      case "currencies": return <><UpdateCurrencyNameOne /><UpdateCurrencyNameTwo /><UpdateCurrencyNameThree /><ListCurrencies /></>; break;
      case "newplayers": return <CreatePlayer />; break;
      default: return <CreateUpdate />; break;
    }
  }
  render() {
    let pages = ["updates", "Loot Boxes", "Currencies", "New Players"];
    return (
      <div>
      <h2>Hark and behold your power</h2>
      <p>This is the development custom update page. For testing and some such nonsense</p>
      <form>
        {pages.map(page => (
          <label key={page.replace(/\s/g, '').toLowerCase()} htmlFor={page.replace(/\s/g, '').toLowerCase()}>
            {page}
            <input type="radio" id={page.replace(/\s/g, '').toLowerCase()} checked={page.replace(/\s/g, '').toLowerCase() == this.state.page} name="page" onChange={(e) => { this.changeState(e) } } value={page.replace(/\s/g, '').toLowerCase()} />
          </label>
        ))}
      </form>
      {this.renderPage()}
      </div>
    );
  }
};

export default CustomUpdates;
