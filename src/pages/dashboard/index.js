import { connect } from 'react-redux';
import Dashboard from './components/dashboard';
import { setDashboardData } from './actions/dashboard';

const mapStateToProps = (state) => ({
  dashboardDetails: state.dashboardDetails,
  profile: state.profile,
});

const mapDispatchToProps = {
  setDashboardData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
