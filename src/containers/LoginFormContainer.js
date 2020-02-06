import {handleGoogleLogin, handleGoogleLogOut, handleLogin, handleLogOut, resetForm} from "../actions/LoginActions";
import {connect} from "react-redux";
import LoginForm from "../components/LoginForm";
import {withRouter} from "react-router-dom";

const mapStateToProps = state => {
	return {
		user: state.session.user,
		errorMsg: state.session.errorMsg,
		isFetching: state.session.isFetching
	}
};

const mapDispatchToProps = dispatch => {
	return {
		handleLogin: (user, history, errorCallback) => dispatch(handleLogin(user, history, errorCallback)),
		handleLogout: () => dispatch(handleLogOut()),
		resetForm: () => dispatch(resetForm()),
		handleGoogleLogin: (googleAuth) => dispatch(handleGoogleLogin(googleAuth)),
		handleGoogleLogOut: (googleAuth) => dispatch(handleGoogleLogOut(googleAuth))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm))

