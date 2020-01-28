import {connect} from "react-redux";
import Profile from "../components/Profile";
import {getProfile} from "../actions/ProfileActions";

const mapStateToProps = state => {
	return {
		user: state.session.user,
		profile: state.profile
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleGetProfile: (profileID) => dispatch(getProfile(profileID))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
