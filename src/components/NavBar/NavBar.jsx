
import React, { PropTypes, Component } from 'react';

class NavBar extends Component {
	static propTypes = {
		navTitle: PropTypes.string.isRequired
	};

	static defaultProps = {
		navTitle: ''
	};

	render() {
		return (
			<div className="fm-nav">
				<div className="nav-title">
					<p className="titletext">{this.props.navTitle}</p>
				</div>
			</div>
		);
	}
}

export default NavBar;
