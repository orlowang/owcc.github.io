
import React, { PropTypes, Component } from 'react'
import { render } from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ArticlePaper from '../../components/ArticlePaper'
import AuthorInfo from '../../components/AuthorInfo'
import NavBar from '../../components/NavBar'
import TimelineList from '../../components/TimelineList'
import { aniLeng } from '../../lib/util'

import './style.less'

class HomePage extends Component {

	slideToggle() {
		let _cn = this.refs.fmBody.className
		this.refs.fmBody.style.position = 'absolute'
		this.refs.fmBody.style.left = '81.8%'
		this.refs.wrap.style.webkitFilter = 'blur(5px)'
		this.refs.fmBody.className = _cn + ' slide'
		console.log(this.refs.fmBody.className)
		this.refs.wrap.addEventListener('touchstart', () => {
			this.refs.wrap.addEventListener('touchend', () => {
				this.refs.fmBody.style.left = ''
				this.refs.wrap.style.webkitFilter = ''
				this.refs.fmBody.className = _cn
			})
		})
	}

	render() {

		let { id } = this.props.params
		let { query } = this.props.location
		let _query = query && query.get ? query.get : ''
		return (
			<div ref="fmBody" className="fm-body">
				<div className="fm-side">
					<div id="menu" onTouchStart={this.slideToggle.bind(this)}><div className="ico"></div></div>
					<AuthorInfo />
					<NavBar paramId={_query}/>
				</div>
				<div ref="wrap" style={{height: '100%', overflow: 'hidden'}}><ArticlePaper paramId={_query}/></div>
			</div>
		)
	}
}

export default HomePage
