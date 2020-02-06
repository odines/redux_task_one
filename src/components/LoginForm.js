import {Component} from "react";
import * as React from "react";
import Loader from "./Loader";
import PropTypes from 'prop-types';


const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const passMinLength = 5;

class LoginForm extends Component {

	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			usernameValidation: {
				isValid: false,
				errorMessage: ''
			},
			passwordValidation: {
				isValid: false,
				errorMessage: ''
			},
			formValid: false
		}
	}

	componentDidMount() {
		window.gapi.load('auth2', function () {
			window.gapi.auth2.init({
				client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID
			}).then(auth2 => console.log('auth ok', auth2), error => console.log('auth init error', error))
			/* Ready. Make a call to gapi.auth2.init or some other API */
		});
		this.props.resetForm();
	}

	handleGoogleLogin = (event) => {
		event.preventDefault();
		this.props.handleGoogleLogin(window.gapi.auth2.getAuthInstance());
	};

	handleGoogleLogout = (event) => {
		event.preventDefault();
		this.props.handleGoogleLogOut(window.gapi.auth2.getAuthInstance());
	}


	handleSubmitForm = (event) => {
		event.preventDefault();
		const {username, password} = {...this.state};
		this.props.handleLogin({username, password}, this.props.history, () => {
			this.setState({password: ''})
		})
	}

	validateField = (name, value) => {
		let isValid;
		switch (name) {
			case 'username':
				isValid = emailRegEx.test(value);
				return (
					{
						usernameValidation: {
							isValid: isValid,
							errorMessage: isValid ? '' : 'Email is not valid'
						}
					}
				);
			case 'password' :
				isValid = (value.length >= passMinLength);
				return ({
					passwordValidation: {
						isValid: isValid,
						errorMessage: isValid ? '' : 'Password is not valid'
					}
				});
			default:
				return {};
		}
	};

	handleChange = (event) => {
		event.preventDefault();
		const {name, value} = event.currentTarget;

		let validationResult = Object.entries(this.validateField(name, value));

		if (validationResult.length > 0) {
			let [validationName, validationValue] = validationResult[0];
			this.setState({
				[name]: value,
				[validationName]: validationValue
			})
		} else {
			this.setState({
				[name]: value
			})
		}
	}

	handleLogOut = (event) => {
		event.preventDefault();
		this.props.handleLogout();
	}

	renderTemplate() {
		const {user, errorMsg} = this.props;

		if (user && user.name) {
			return (
				<React.Fragment>
					{/*<h1>UserName: </h1>
					<p>{user.name}</p>
					<button onClick={this.handleLogOut}>Log Out</button>*/}
					<p><b>UserName:</b> {user.name}</p>
					<button className='btn btn-danger' onClick={this.handleGoogleLogout}>Google Logout</button>
				</React.Fragment>
			)
		} else {
			return (
				<React.Fragment>
					{/*<form onSubmit={this.handleSubmitForm} className="col-md-6">
						<div className='form-group'>
							<label htmlFor='email'>Email address</label>
							<input type='email'
								   className={this.state.usernameValidation.isValid ? 'form-control' : 'form-control error'}
								   name='username' placeholder='Email address'
								   value={this.state.username}
								   onChange={this.handleChange}/>
							{!this.state.usernameValidation.isValid ?
								<span className='error'>{this.state.usernameValidation.errorMessage}</span> : ''}
						</div>

						<div className='form-group'>
							<label htmlFor='password'>Password</label>
							<input type='password'
								   className={this.state.passwordValidation.isValid ? 'form-control' : 'form-control error'}
								   placeholder='Password' name='password'
								   value={this.state.password}
								   onChange={this.handleChange}/>
							{!this.state.passwordValidation.isValid ?
								<span className='error'>{this.state.passwordValidation.errorMessage}</span> : ''}

						</div>
						<button disabled={!(this.state.usernameValidation.isValid && this.state.passwordValidation.isValid)}
								type='submit' className='btn btn-primary'>Submit
						</button>
					</form>*/}
					<button className='btn btn-primary' onClick={this.handleGoogleLogin}>Google Login</button>

					{errorMsg ? (
							<React.Fragment>
								<h1>Error Message:</h1>
								<span>{errorMsg}</span>
							</React.Fragment>
						)
						: null}
				</React.Fragment>
			)
		}
	}

	render() {
		return (
			<div className='container'>
				<h1>Login Form</h1>
				{this.props.isFetching ? <Loader/> : this.renderTemplate()}
			</div>
		)
	}
}

LoginForm.propTypes = {
	handleLogout: PropTypes.func.isRequired,
	handleLogin: PropTypes.func.isRequired,
	isFetching: PropTypes.bool.isRequired,
	errorMsg: PropTypes.string.isRequired,

	user: PropTypes.object,
	errorMessage: PropTypes.string,
};


export default LoginForm;