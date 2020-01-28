import {Component} from "react";
import * as React from "react";
import Loader from "./Loader";


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


		this.props.handleLogin({username, password}, this.props.history, () => {
			this.setState({password: ''})
		})
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
						<div className='form-group'>
							<label htmlFor='email'>Email address</label>
							<input type='email' className='form-control' name='username' placeholder='Email address' value={this.state.username}
								   onChange={this.handleChange}/>
						</div>

						<div className='form-group'>
							<label htmlFor='password'>Password</label>
							<input type='password' className='form-control' placeholder='Password' name='password' value={this.state.password}
								   onChange={this.handleChange}/>
						</div>
						<button type='submit' className='btn btn-primary'>Submit</button>
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