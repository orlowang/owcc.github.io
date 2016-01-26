
import React, { PropTypes, Component } from 'react'
import { render } from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ArticlePaper from '../../components/ArticlePaper'
import AuthorInfo from '../../components/AuthorInfo'
import NavBar from '../../components/NavBar'
import TimelineList from '../../components/TimelineList'
import { starsAnimate } from '../../lib/util'

import './style.less'

class HomePage extends Component {

	slideToggle() {
		let _cn = this.refs.fmBody.className
		this.refs.fmBody.style.position = 'absolute'
		this.refs.fmBody.style.left = '81.8%'
		this.refs.wrap.style.webkitFilter = 'blur(5px)'
		this.refs.fmBody.className = _cn + ' slide'
		this.refs.wrap.addEventListener('touchstart', () => {
			this.refs.wrap.addEventListener('touchend', () => {
				this.refs.fmBody.style.left = ''
				this.refs.wrap.style.webkitFilter = ''
				this.refs.fmBody.className = _cn
			})
		})
	}

	componentDidMount() {
		let _screenX = document.body.clientWidth
		let _timeHour = new Date().getHours()
		_screenX >= 750 && _timeHour <= 6 && _timeHour >= 20 && starsAnimate({
			width: this.refs.fmSide.clientWidth, 
			height: this.refs.fmSide.clientHeight,
			gray: false,
			minColor: 100
		})
	}

	render() {

		let { id } = this.props.params
		let { query } = this.props.location
		let _query = query && query.get ? query.get : ''
		let _screenX = document.body.clientWidth
		let _timeHour = new Date().getHours()

		return (
			<div ref="fmBody" className="fm-body">
				<div ref="fmSide" className="fm-side">
					{_screenX >= 750 ? _timeHour <= 6 && _timeHour >= 20 && <canvas id="fmSideBG" style={{
							width: '100%',
							height: '100%',
							position: 'absolute',
							top: 0,
							left: 0
						}}></canvas> : <div id="menu" onTouchStart={this.slideToggle.bind(this)}><div className="ico"></div></div>
					}
					<AuthorInfo />
					<NavBar paramId={_query}/>
				</div>
				<div ref="wrap" style={{height: '100%', overflow: 'hidden'}}><ArticlePaper paramId={_query}/></div>
			</div>
		)
	}
}

export default HomePage
