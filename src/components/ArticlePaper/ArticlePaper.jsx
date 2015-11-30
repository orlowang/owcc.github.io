
import React, { PropTypes, Component } from 'react';

class ArticlePaper extends Component {
	static propTypes = {
		articleTitle: PropTypes.string.isRequired
	};

	static defaultProps = {
		articleTitle: ''
	};

	render() {
		return (
			<div className="fm-article">
				<div className="articleprofile">
					<p className="articleprofiletext">hello,{this.props.articleTitle}</p>
				</div>
			</div>
		);
	}
}

export default ArticlePaper;
