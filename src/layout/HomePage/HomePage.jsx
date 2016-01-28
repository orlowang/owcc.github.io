
import React, { PropTypes, Component } from 'react'
import { render } from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ArticlePaper from '../../components/ArticlePaper'
import AuthorInfo from '../../components/AuthorInfo'
import NavBar from '../../components/NavBar'
import TimelineList from '../../components/TimelineList'
import { starsAnimate } from '../../lib/util'

class HomePage extends Component {

	slideToggle() {
		let _cn = this.refs.fmBody.className
		// this.refs.fmBody.style.position = 'absolute'
		this.refs.fmSide.style.left = '81.8%'
		this.refs.fmSide.style.backgroundColor = 'rgba(255,255,255,.82)'
		this.refs.wrap.style.webkitFilter = 'blur(5px)'
		this.refs.wrap.style.position = 'fixed'
		this.refs.fmBody.className = _cn + ' slide'
		this.refs.wrap.addEventListener('touchstart', () => {
			this.hiddenMenu(this.refs, _cn)
		})
	}

	componentDidMount() {
		let _ref = this.refs
		let that = this
		let _screenX = document.body.clientWidth
		let _cn = this.refs.fmBody.className
		let _timeHour = new Date().getHours()
		_screenX >= 750 && _timeHour <= 6 && _timeHour >= 20 && starsAnimate({
			width: this.refs.fmSide.clientWidth, 
			height: this.refs.fmSide.clientHeight,
			gray: false,
			minColor: 100
		})
		document.body.addEventListener('click', function(e) {
			e.target.className == 'menuhref' && that.hiddenMenu(_ref, _cn)
		})
	}

	hiddenMenu(arr, cn){
		arr.fmSide.style.left = ''
		arr.wrap.style.webkitFilter = ''
		arr.wrap.style.position = ''
		arr.fmSide.style.backgroundColor = 'none'
		arr.fmBody.className = cn
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
				<div ref="wrap" style={{height: '100%', width: '100%', overflow: 'hidden'}}><ArticlePaper paramId={_query}/></div>
			</div>
		)
	}
}

export default HomePage
