
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

		// 这里注意使用map！如果使用for循环会导致link(componentWillUpdate)触发两次

		let navitem = categorys.map(function(cate, i){
			return (
				<li key={i} className="list" activeClassName="on">
					<Link to={cate.id}>{cate.title}</Link>
				</li>
			)
		})

		return (
			<div className="category">
				<div className="navtitle">
					<p className="titletext">{this.props.navTitle}</p>
				</div>
				<ul className="navlist">
					{navitem}
				</ul>
			</div>
		);
	}
}

export default NavBar;
