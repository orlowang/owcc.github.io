
import { PropTypes, Component } from 'react';
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
		return (
			<div className="fm-body">
				<div className="fm-l">
					<AuthorInfo />
					<NavBar />
				</div>
				<div className="fm-r">
					<ArticlePaper />
				</div>
			</div>
		);
	}
}

export default HomePage;
