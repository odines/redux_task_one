import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";

const PrivateRoute = ({component: Component, ...rest}) => {
	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to /signin page
		<Route {...rest} render={(props) => {

			if (rest.isLogin) {
				return <Component {...props} />

			} else return <Redirect to="/login"/>

		}}/>
	);
};

const mapStateToProps = state => {
	return ({
		isLogin: state.session.user
	})
}


export default connect(mapStateToProps)(PrivateRoute);