
import React, { PropTypes, Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import './style.less';

class NoPage extends Component {

	render() {
		return (
			<div className="NoPage">
				Page Not Found.
			</div>
		);
	}
}

export default NoPage;
