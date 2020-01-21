import {handleLogin, handleLogOut} from "../actions/LoginActions";
import {connect} from "react-redux";
import LoginForm from "../components/LoginForm";
import {withRouter} from "react-router-dom";

const mapStateToProps = state => {
	return {
		user: state.session.user,
		errorMsg: state.session.errorMsg
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleLogin: (user, history) => dispatch(handleLogin(user, history)),
		handleLogout: () => dispatch(handleLogOut())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm))

