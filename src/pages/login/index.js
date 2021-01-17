import Login from './components/login';
import { connect } from 'react-redux';
import { setUserToken } from './actions/login';

const mapStateToProps = () => ({});

const mapDispatchToProps = { setUserToken };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
