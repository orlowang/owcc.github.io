
import React, { PropTypes, Component } from 'react'
import { render } from 'react-dom'
import ArticlePaper from '../../components/ArticlePaper'
import AuthorInfo from '../../components/AuthorInfo'
import NavBar from '../../components/NavBar'
import TimelineList from '../../components/TimelineList'

class HomePage extends Component {

	slideToggle() {
		this.refs.fmBody.style.position = 'absolute'
		this.refs.fmBody.style.left = '61.8%'
		this.refs.wrap.style.filter = 'blur(5px)'
		console.log(this.refs.wrap.click)
		this.refs.wrap.click = () => {
			this.refs.fmBody.style.left = ''
		}
	}

	render() {

		let { id } = this.props.params
		let { query } = this.props.location
		let _query = query && query.get ? query.get : ''
		return (
			<div ref="fmBody" className="fm-body">
				<div className="fm-side">
					<div id="menu" onClick={this.slideToggle.bind(this)}></div>
					<AuthorInfo />
					<NavBar paramId={_query}/>
				</div>
				<div ref="wrap" style={{height: '100%', overflow: 'hidden'}}><ArticlePaper paramId={_query}/></div>
			</div>
		)
	}
}

export default HomePage
