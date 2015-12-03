
import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router'
import { category } from '../../static.config';
import './style.less';

class NavBar extends Component {
	static propTypes = {
		navTitle: PropTypes.string.isRequired
	};

	static defaultProps = {
		navTitle: ''
	};

	render() {
		let navitem = []
		for (let i = 0; i < category.length; i++) {
			navitem.push(<Link className="list animated" activeClassName="on" to={category[i].id}>{category[i].title}</Link>)
		}
		return (
			<div className="fm-nav">
				<div className="navtitle">
					<p className="titletext">{this.props.navTitle}</p>
				</div>
				<div className="navlist">
					{navitem}
				</div>
			</div>
		);
	}
}

export default NavBar;
