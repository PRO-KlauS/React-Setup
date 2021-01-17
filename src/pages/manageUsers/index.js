import { connect } from 'react-redux';
import manageUsers from './components/manageUsers';
import { getUsers } from './actions/manageUsers';

const mapStateToProps = (state) => ({
  users: state.users,
  profile: state.profile,
});

const mapDispatchToProps = { getUsers };

export default connect(mapStateToProps, mapDispatchToProps)(manageUsers);
