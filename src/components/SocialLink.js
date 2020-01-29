import React from "react";

export const SocialLink = ({link, label}) => {
	return (

		<a href={link} target='_blank' rel="noopener noreferrer"> <i className="fas fa-link link-icon"/>{label}</a>

	)
};