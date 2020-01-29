import {Component} from "react";
import * as React from "react";
import Loader from "./Loader";

const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const passMinLength = 6;


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

		this.handleSubmitForm = this.handleSubmitForm.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleLogOut = this.handleLogOut.bind(this);
	}

	handleSubmitForm(event) {
		event.preventDefault();
		const {username, password} = {...this.state};


		this.props.handleLogin({username, password}, this.props.history, () => {
			this.setState({password: ''})
		})
	}

	validateField = (name) => {
		let value = this.state[name];
		let isValid;
		switch (name) {

			case 'username':
				isValid = emailRegEx.test(value);

				console.log('fieldname = ' + name + ', isValid = ' + isValid);

				this.setState({
					usernameValidation: {
						isValid: isValid,
						errorMessage: isValid ? '' : 'Email is not valid'
					}
				});
				break;

			case 'password' :
				isValid = (value.length >= passMinLength);
				console.log('fieldname = ' + name + ', isValid = ' + isValid);

				this.setState({
					passwordValidation: {
						isValid: isValid,
						errorMessage: isValid ? '' : 'Password is not valid'
					}
				});
				break;
		}

	};

	handleChange(event) {
		const {name, value} = event.target;


		this.setState({[name]: value}, () => {
			this.validateField(name)
		})
	}

	handleLogOut(event) {
		this.props.handleLogout();
	}

	renderTemplate() {
		const {user, errorMsg} = this.props;

		if (user && user.name) {
			return (
				<React.Fragment>
					<h1>UserName: </h1>
					<p>{user.name}</p>
					<button onClick={this.handleLogOut}>Log Out</button>
				</React.Fragment>
			)
		} else {
			return (
				<React.Fragment>
					<form onSubmit={this.handleSubmitForm}>
						<div className='form-group'>
							<label htmlFor='email'>Email address</label>
							<input type='email' className='form-control' name='username' placeholder='Email address'
								   value={this.state.username}
								   onChange={this.handleChange}/>
							{!this.state.usernameValidation.isValid ?
								<span className='error'>{this.state.usernameValidation.errorMessage}</span> : ''}
						</div>

						<div className='form-group'>
							<label htmlFor='password'>Password</label>
							<input type='password' className='form-control' placeholder='Password' name='password'
								   value={this.state.password}
								   onChange={this.handleChange}/>
							{!this.state.passwordValidation.isValid ?
								<span className='error'>{this.state.passwordValidation.errorMessage}</span> : ''}

						</div>
						<button disabled={!(this.state.usernameValidation.isValid && this.state.passwordValidation.isValid)} type='submit' className='btn btn-primary'>Submit</button>
					</form>
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

export default LoginForm;