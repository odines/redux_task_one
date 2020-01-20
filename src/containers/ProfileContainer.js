import {connect} from "react-redux";
import Profile from "../components/Profile";

const mapStateToProps = state => {
	return {
		user: state.session.user
	}
}

export default connect(mapStateToProps)(Profile)
