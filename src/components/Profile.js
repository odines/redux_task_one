import React, {Component} from "react";
import Loader from "./Loader";
import {SocialLink} from "./SocialLink";
import PropTypes from 'prop-types';


class Profile extends Component {

	componentDidMount() {
		const {id} = this.props.user;
		this.props.handleGetProfile(id)
	}

	renderTemplate = () => {

		const {errorMsg, isFetching, profileData} = this.props.profile;
		if (errorMsg) {
			return (
				<h1 className='error'>{errorMsg}</h1>
			)
		} else {
			if (isFetching) {
				return <Loader/>
			} else if (profileData) {
				return (
					<React.Fragment>

						<p><b>City:</b> {profileData.city} </p>

						<p><b>Знание языков:</b></p>
						<ul>
							{profileData.languages.map((language, index) => {
								return (<li key={index}>{language}</li>)
							})}

						</ul>

						<p><b>Ссылки :</b></p>

						<ul>
							{profileData.social.map((linkItem, index) => {
								return (<li key={index}>
									<SocialLink link={linkItem.link} label={linkItem.label}/>
								</li>)
							})}
						</ul>


					</React.Fragment>
				)
			}
		}


	};

	render() {
		return (
			<div className='container'>
				<h1>Profile Page</h1>
				{this.renderTemplate()}

			</div>
		)
	}
}

Profile.propTypes = {
	handleGetProfile: PropTypes.func.isRequired,

	profile: PropTypes.shape({
		errorMsg: PropTypes.string,
		isFetching: PropTypes.bool,
		profileData: PropTypes.shape({
			city: PropTypes.string,
			languages: PropTypes.arrayOf(PropTypes.string),
			social: PropTypes.arrayOf(PropTypes.shape({
				link: PropTypes.string,
				label: PropTypes.string
			}))
		})
	})
};

export default Profile


