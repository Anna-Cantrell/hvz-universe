import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import Signup from './Signup';
import Loading from './Loading';
import SigninStyles from './styles/SigninStyles';
import { PageContainer } from './styles/GeneralStyles';

const PleaseSignIn = (props) => (
  <Query query={CURRENT_USER_QUERY}>
  {({data, loading}) => {
    if(loading) return <Loading fullscreen="true" />;
    if(!data.me) {
      return (
        <SigninStyles>
          <div className="wrapper">
            <div className="hero-text">
              <h1>Humans <span>Vs</span> Zombies</h1>
              <h2>10th Anniversary</h2>
              <span className="date">(Oct 28th - Nov 1st)</span>
              <ul className="features">
                <li>Greensboro's Largest Game of tag</li>
                <li>24/7 Gameplay</li>
                <li>Fight to survive the apocalypse or to end all humans</li>
              </ul>
            </div>
            <div className="form-container">
              <Signup />
            </div>
          </div>
        </SigninStyles>
      )
    }
    if(props.page == 'admin' && !data.me.permissions.includes('ADMIN')) {
      return (
        <PageContainer>
          <div className="wrapper">
            <div className="hero-text">
              <h1>Well this is awkward...</h1>
              <p>Looks like you don't have the cred to be here. If you think you SHOULD be allowed in then contact a moderator.</p>
            </div>
          </div>
        </PageContainer>
      )
    }
    return props.children;
  }}
  </Query>
);

export default PleaseSignIn
