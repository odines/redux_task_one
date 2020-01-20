import {handleLogin, handleLogOut} from "../actions/LoginActions";
import {connect} from "react-redux";
import LoginForm from "../components/LoginForm";

const mapStateToProps = state => {
	return {
		user: state.session.user,
		errorMsg: state.session.errorMsg
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleLogin: (username, password) => dispatch(handleLogin(username, password)),
		handleLogout: () => dispatch(handleLogOut())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)

