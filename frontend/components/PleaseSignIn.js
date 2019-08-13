import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import Signup from './Signup';
import SigninStyles from './styles/SigninStyles';

const PleaseSignIn = (props) => (
  <Query query={CURRENT_USER_QUERY}>
  {({data, loading}) => {
    if(loading) return <p>...loading</p>
    if(!data.me) {
      return (
        <SigninStyles>
          <div className="wrapper">
            <div className="hero-text">
              <h1>Humans Vs Zombies</h1>
              <h2>10th Anniversary</h2>
            </div>
            <div className="form-container">
              <Signup />
            </div>
          </div>
        </SigninStyles>
      )
    }
    return props.children;
  }}
  </Query>
);

export default PleaseSignIn
