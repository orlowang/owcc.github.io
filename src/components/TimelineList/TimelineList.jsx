
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

		let _posts = []
		
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

		var child = _posts.map(function(post, i){
			let tmp$time = post.publishtime.split('/')
			return (
				<div key={i} className="listcard">
					<div className="photo">
						<div className="timepoint"></div>
						<div className="date">{`${tmp$time[1]}/${tmp$time[2]}`}</div>
						{post.preview != '' ? <img className="cardcover" src={post.preview} alt=""/> : null}
					</div>
					<div className="docinfo">
						<Link to={post.id}>{post.title}</Link>
						<p className="text">{post.subtitle}</p>
					</div>
				</div>
			)
		})

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
