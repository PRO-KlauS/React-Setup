import { connect } from 'react-redux';
import Profile from './profile';
import { updateProfileData } from '../../actions/profile';

const mapStateToProps = (state) => ({ profile: state.profile });

const mapDispatchToProps = { updateProfileData };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
