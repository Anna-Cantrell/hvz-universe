import CreateUpdate from '../../../components/CreateUpdate';
import CreatePlayer from '../../../components/CreatePlayer';
import UpdateCurrencyNameOne from '../../../components/UpdateCurrencyNameOne';
import UpdateCurrencyNameTwo from '../../../components/UpdateCurrencyNameTwo';
import UpdateCurrencyNameThree from '../../../components/UpdateCurrencyNameThree';
import ListCurrencies from '../../../components/ListCurrencies';

const CustomUpdates = props => (
  <div>
    <h2>Hark and behold your power</h2>
    <p>This is the development custom update page. For testing and some such nonsense"</p>
    <CreateUpdate />
    <CreatePlayer />
    <UpdateCurrencyNameOne />
    <UpdateCurrencyNameTwo />
    <UpdateCurrencyNameThree />
    <ListCurrencies />
  </div>
);

export default CustomUpdates;
