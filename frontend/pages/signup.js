import {PageContainer} from '../components/styles/GeneralStyles';
import Signup from '../components/Signup';
import Signin from '../components/Signin';
import RequestReset from '../components/RequestReset';

const SignupPage = props => (
  <PageContainer>
    <Signup />
    <Signin />
    <RequestReset />
  </PageContainer>
);

export default SignupPage;
