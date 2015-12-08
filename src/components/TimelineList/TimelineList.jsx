
import React, { PropTypes, Component } from 'react';
import { cid, clist } from '../../cache/cache';
import { Link } from 'react-router';
import './style.less';

class TimelineList extends Component {
	static propTypes = {
		categoryId: PropTypes.string.isRequired
	};

	static defaultProps = {
		categoryId: '0'
	};

	render() {

		let _posts
		let child = []

		if (clist[cid.indexOf(this.props.categoryId)] != undefined) {
			_posts = clist[cid.indexOf(this.props.categoryId)].posts
			for (let i = 0; i < _posts.length; i++) {
				child.push(
					<div className="listcard">
						<div className="photo">
							<div className="timepoint"></div>
							<div className="date">1/13</div>
							{_posts[i].bgimg.indexOf('.') >= 0 ? <img className="cardcover" src={_posts[i].bgimg} alt=""/> : null}
						</div>
						<div className="docinfo">
							<Link to={_posts[i].id}>{_posts[i].title}</Link>
							<p className="text">{_posts[i].profile}</p>
						</div>
					</div>
				)
			}
		}

		return (
			<div className="fm-timeline">
				<div className="timeline">
					<div className="yearland">
						<div className="yearpoint"></div>
						<div className="year">2015Year</div>
					</div>
				</div>
				<div className="lestcardcontainer">
					{child}
				</div>
			</div>
		);
	}
}

export default TimelineList;
