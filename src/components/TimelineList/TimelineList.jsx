
import React, { PropTypes, Component } from 'react'
import { categorys, posts } from '../../cache/datacache'
import { Link } from 'react-router'
import './style.less'

class TimelineList extends Component {
	static propTypes = {
		categoryId: PropTypes.string.isRequired
	}

	static defaultProps = {
		categoryId: '0'
	}

	render() {

		let _posts
		let child = []
		
		if (this.props.categoryId == 0) {
			_posts = posts
		} else{
			let ids = []
			for (let i = 0; i < categorys.length; i++) {
				ids.push(categorys[i].id)	
			}
			if (ids.indexOf(this.props.categoryId) >= 0) {
				_posts = categorys[ids.indexOf(this.props.categoryId)].posts
			}
		}

		for (let i = 0; i < _posts.length; i++) {
			child.push(
				<div className="listcard">
					<div className="photo">
						<div className="timepoint"></div>
						<div className="date">12/30</div>
						{_posts[i].preview != '' ? <img className="cardcover" src={_posts[i].preview} alt=""/> : null}
					</div>
					<div className="docinfo">
						<Link to={_posts[i].id}>{_posts[i].title}</Link>
						<p className="text">{_posts[i].subtitle}</p>
					</div>
				</div>
			)
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
		)
	}
}

export default TimelineList
