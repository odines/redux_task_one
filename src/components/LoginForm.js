import {Component} from "react";
import * as React from "react";

class LoginForm extends Component {

	constructor() {
		super();
		this.state = {
			username: '',
			password: ''
		}

		this.handleSubmitForm = this.handleSubmitForm.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleLogOut = this.handleLogOut.bind(this);
	}

	handleSubmitForm(event) {
		event.preventDefault();
		const {username, password} = {...this.state};
		this.props.handleLogin({username, password}, this.props.history)
	}

	handleChange(event) {
		const {name, value} = event.target;
		this.setState({[name]: value})
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
						<input placeholder='UserName' name='username' value={this.state.username} onChange={this.handleChange}/>
						<input placeholder='Password' name='password' value={this.state.password} onChange={this.handleChange}/>
						<button>Submit</button>
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
			<div>
				<h2>Login Form</h2>
				{this.renderTemplate()}

			</div>
		)
	}
}

export default LoginForm;