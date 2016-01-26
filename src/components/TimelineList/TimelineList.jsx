
import React, { PropTypes, Component } from 'react'
import { posts } from '../../cache/posts'
import { Link } from 'react-router'
import { isCategory } from '../../lib/util'
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
		let _id = this.props.categoryId
		if (_id == 0) {
			_posts = posts
		} else{
			if (isCategory != null) {
				posts.map(function(post){
					if (post.category == _id) { _posts.push(post) }
				})
			}
		}

		var child = _posts.map(function(post, i){
			let tmp$time = post.publishtime.split('/')
			let month, bgcolor

			switch(tmp$time[1]){
				case '01':
					month = 'Jan'
					bgcolor = '#dc0000'
					break
				case '02':
					month = 'Feb'
					bgcolor = '#dc0000'
					break
				case '03':
					month = 'Mar'
					bgcolor = '#dc0000'
					break
				case '04':
					month = 'Apr'
					bgcolor = '#dc0000'
					break
				case '05':
					month = 'May'
					bgcolor = '#dc0000'
					break
				case '06':
					month = 'Jun'
					bgcolor = '#dc0000'
					break
				case '07':
					month = 'Jul'
					bgcolor = '#dc0000'
					break
				case '08':
					month = 'Aug'
					bgcolor = '#dc0000'
					break
				case '09':
					month = 'Sep'
					bgcolor = '#dc0000'
					break
				case '10':
					month = 'Oct'
					bgcolor = '#dc0000'
					break
				case '11':
					month = 'Nov'
					bgcolor = '#dc0000'
					break
				case '12':
					month = 'Dec'
					bgcolor = '#dc0000'
					break
			}

			return (
				<div key={i} className="listcard">
					<div className="timepoint"></div>
					<div className="date" style={{ backgroundColor: bgcolor }}>{`${month} ${tmp$time[2]}`}</div>
					<div className="docinfo">
						<Link query={{ get: post.id }} to='/'>{post.title}</Link>
						<p className="text">{post.subtitle}</p>
						<div className="photo">
							{post.preview != '' ? <div className="cardcover" style={{ backgroundImage: `url(${post.preview})`, backgroundSize: '100%' }} alt=""></div> : null}
						</div>
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
