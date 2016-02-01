
import React, { PropTypes, Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import { author } from '../../static.config';
import './style.less';

class AuthorInfo extends Component {
	static propTypes = {
		authorName: PropTypes.string.isRequired,
		authorPhotoUri: PropTypes.string.isRequired
	};

	static defaultProps = {
		authorName: author.name,
		authorPhotoUri: author.photo
	};

	render() {
		return (
			<div className="fm-author">
				<div className="authorcontainer">
					<img src={this.props.authorPhotoUri} alt="" className="authorimg"/>
				</div>
				<Link query={{ get: 'about' }} to="/" className="authornamelink">
					<span className="authorname">{this.props.authorName}</span>
				</Link>
			</div>
		)
	}
}

export default AuthorInfo;
