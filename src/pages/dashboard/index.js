import { connect } from "react-redux";
import Dashboard from "./dashboard";

const mapStateToProps = (state) => ({
  dashboardDetails: state.dashboardDetails,
  profile: state.profile,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
