
import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { categorys } from '../../cache/datacache'
import './style.less'

class NavBar extends Component {
	static propTypes = {
		navTitle: PropTypes.string.isRequired
	};

	static defaultProps = {
		navTitle: ''
	}

	render() {
		let navitem = []
		for (let i = 0; i < categorys.length; i++) {
			navitem.push(<Link className="list" activeClassName="on" to={categorys[i].id}>{categorys[i].title}</Link>)
		}
		return (
			<div className="category">
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
