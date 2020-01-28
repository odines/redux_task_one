import React, {Component} from "react";
import Loader from "./Loader";


function SocialLink(props) {
	return (

		<a href={props.link} target='_blank' rel="noopener noreferrer"> <i className="fas fa-user"/>{props.label}</a>

	)

}

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

						<p>City: {profileData.city} </p>

						<p>Знание языков:</p>
						<ul>
							{profileData.languages.map((language, index) => {
								return (<li key={index}>{language}</li>)
							})}

						</ul>

						<p>Ссылки :</p>

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

export default Profile


