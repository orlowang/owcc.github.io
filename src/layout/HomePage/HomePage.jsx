
import React, { PropTypes, Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router'
import ArticlePaper from '../../components/ArticlePaper';
import AuthorInfo from '../../components/AuthorInfo';
import NavBar from '../../components/NavBar';
import TimelineList from '../../components/TimelineList';

class HomePage extends Component {
	static propTypes = {

	};

	render() {
		let { id } = this.props.params;

		return (
			<div className="fm-body">
				<div className="fm-l">
					<AuthorInfo />
					<NavBar />
				</div>
				<div className="fm-r">
					<ArticlePaper paramId={id}/>
				</div>
			</div>
		);
	}
}

export default HomePage;
