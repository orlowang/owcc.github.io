
import React, { PropTypes, Component } from 'react';

class Document extends Component {
	static propTypes = {
		postId: PropTypes.string.isRequired
	};

	static defaultProps = {
		
		postId: ''
	};

	render() {
		return (
			<div className="fm-nav">
				<div className="nav-title">
					<p className="titletext">{this.props.postId}</p>
				</div>
			</div>
		);
	}
}

export default Document;
