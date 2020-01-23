import React from "react";

import {Planets} from 'react-preloaders';


class News extends React.Component {

	componentDidMount() {
		this.props.fetchNews();
	}

	renderTemplate = () => {
		const {newsData, isFetching, error} = this.props.news;

		if (error) {
			return (
				<h1 className='error'>{error}</h1>
			)
		}

		return (

			<div className='news-container'>
				<Planets customLoading={isFetching} time={0}/>
				<ul className='news-data col-md-12'>
					{newsData.map((entry) => {
						return (
							<li key={entry.id}>
								<p><b>Title:</b> {entry.title} </p>
								<p><b>Text:</b> {entry.text} </p>
							</li>
						)

					})}

				</ul>


				<h2><b>Всего новостей: {newsData.length}</b></h2>
			</div>
		)
	};


	render() {

		return (
			<div className='container'>
				<h1>News Page</h1>
				{this.renderTemplate()}

			</div>
		)

	}
}

export default News;