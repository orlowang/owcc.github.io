
import React, { PropTypes, Component } from 'react'
import { posts } from '../../cache/posts'
import { Link } from 'react-router'
import { isCategory, __Array } from '../../lib/util'
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
			posts.map(function(post, i){
				let year = post.publishtime.split('/')[0]
				_posts.indexOf(year) < 0 && _posts.push(year)
				_posts.push(post)
			})
		} else{
			if (isCategory != null) {
				posts.map(function(post){
					if (post.category == _id) { 
						let year = post.publishtime.split('/')[0]
						_posts.indexOf(year) < 0 && _posts.push(year)
						_posts.push(post)
					}
				})
			}
		}

		console.log(_posts)

		var child = _posts.map(function(post, i){
			if (typeof post != 'object') {
				return (
					<div className="yearland">
						<div className="year">{`Notes for year ${post}`}</div>
					</div>
				)
			} else{
				let tmp$time = post.publishtime.split('/')
				let _screenX = document.body.clientWidth
				let month, bgcolor

				switch(tmp$time[1]){
					case '01':
						month = 'Jan'
						bgcolor = '#dc0000'
						break
					case '02':
						month = 'Feb'
						bgcolor = '#8625ff'
						break
					case '03':
						month = 'Mar'
						bgcolor = '#ff10eb'
						break
					case '04':
						month = 'Apr'
						bgcolor = '#3d1dff'
						break
					case '05':
						month = 'May'
						bgcolor = '#1d72ff'
						break
					case '06':
						month = 'Jun'
						bgcolor = '#00b9e1'
						break
					case '07':
						month = 'Jul'
						bgcolor = '#00e1d9'
						break
					case '08':
						month = 'Aug'
						bgcolor = '#00b640'
						break
					case '09':
						month = 'Sep'
						bgcolor = '#62b600'
						break
					case '10':
						month = 'Oct'
						bgcolor = '#b68900'
						break
					case '11':
						month = 'Nov'
						bgcolor = '#b64500'
						break
					case '12':
						month = 'Dec'
						bgcolor = '#dc0000'
						break
				}

				return (
					<div key={i} className="listcard cfix" style={post.preview != '' && _screenX >= 750 ? { height: '15.31vw' } : {}}>
						<div className="doctext" style={{ width: post.preview != '' && _screenX >= 750 ? '61.2%' : '100%' }}>
							<Link query={{ get: post.id }} to='/'>{post.title}</Link>
							<p className="text">{post.subtitle}</p>
							<div className="date">{`${month} ${tmp$time[2]}`}</div>
						</div>
						{post.preview != '' ? <div className="photo"><div className="cardcover" style={{ backgroundImage: `url(${post.preview})`, backgroundSize: '100%' }} alt=""></div></div> : null}
					</div>
				)
			}
		})

		return (
			<div className="fm-timeline">
				{child}
			</div>
		)
	}
}

export default TimelineList
