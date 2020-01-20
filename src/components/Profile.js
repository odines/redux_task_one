import React, {Component} from "react";

class Profile extends Component {
	render() {
		const {user} = this.props;
		return (
			<div>
				<h1>Profile Page</h1>
				<h2>User Name = {user.name}</h2>
			</div>
		)
	}
}

export default Profile


