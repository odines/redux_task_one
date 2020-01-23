import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink
} from "react-router-dom";
import PrivateRoute from "./containers/PrivateRouteContainer";
import LoginFormContainer from "./containers/LoginFormContainer";
import ProfileContainer from "./containers/ProfileContainer";
import NewsContainer from "./containers/NewsContainer";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function App() {
	return (
		<Router>

			<div>
				<ul className="navigation-list">
					<li>
						<NavLink activeClassName='active' exact={true} to="/">Home</NavLink>
					</li>
					<li>
						<NavLink activeClassName='active' to="/login">Login</NavLink>
					</li>
					<li>
						<NavLink activeClassName='active' to="/news">News</NavLink>
					</li>
					<li>
						<NavLink activeClassName='active' to="/profile">Profile</NavLink>
					</li>
				</ul>

				{/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
				<Switch>
					<Route exact path="/">
						<Home/>
					</Route>
					<Route path="/login">
						<LoginFormContainer/>
					</Route>
					<Route path="/news">
						<NewsContainer/>
					</Route>
					<PrivateRoute path='/profile' component={ProfileContainer}/>
				</Switch>
			</div>
		</Router>
	);
}

function Home() {
	return (
		<div>
			<h2>Home</h2>
		</div>
	);
}