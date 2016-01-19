
import React, { PropTypes, Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import TimelineList from '../TimelineList'
import Document from '../Document'
import { fetchMarkdown, parseMarkdown, isCategory } from '../../lib/util'
import { homeset, categorys } from '../../cache/datacache'

import './style.less'

class ArticlePaper extends Component {

	static propTypes = {
		paramId: PropTypes.string.isRequired
	}

	static defaultProps = {
		paramId: ''
	}

	constructor(props) {
    super(props)
    this.state = {
			title: homeset.title,
			subtitle: homeset.subtitle,
			bgphoto: homeset.bgphoto,
			doc: ''
		}
  }

	componentWillReceiveProps(nextProps){

		// 这里注意传递nextProps不是this.props
		this.setStateHandle(nextProps.paramId)
	}

	componentWillMount() {
		this.setStateHandle(this.props.paramId)
	}

	componentDidMount() {
		window.addEventListener('scroll', this.scrollHandle.bind(this))
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.scrollHandle.bind(this))
	}

	setStateHandle(arg){
		let iscate = isCategory(arg)
		if (arg == '') {
			this.setState({
				title: homeset.title,
				subtitle: homeset.subtitle,
				bgphoto: homeset.bgphoto,
				doc: ''
			})
		} else {
			if (iscate != null) {
				this.setState({
					title: categorys[iscate].title,
					subtitle: categorys[iscate].subtitle,
					bgphoto: categorys[iscate].bgphoto
				})
			} else {
				let that = this
				fetchMarkdown(arg, (body)=>{
					parseMarkdown(body, (data)=>{
						that.setState({
							title: data.title,
							subtitle: data.subtitle,
							bgphoto: data.bgphoto,
				    	doc: data.body
				    })
					})
				})
			}
		}
	}

	scrollHandle(){
		let elm$2 = this.refs.articleProfile
		let elm$3 = this.refs.articleprofiletitle
		let elm$4 = this.refs.articleprofiletext
		let elm$3_style = document.defaultView.getComputedStyle(elm$3, null)
		let _screenX = document.body.clientWidth
		let _bodyFontSize = parseInt(document.defaultView.getComputedStyle(document.body, null).fontSize)
		
		let defaultFontSize = 2.4
		let finalFontSize = 1				// 单位rem
		let elm$3pt = 2							// elm$3默认的paddingTop值

		if (_screenX >= 750) {
			if (window.scrollY >= elm$2.clientHeight - 4) {
				elm$2.style.top = `-${elm$2.clientHeight - 4}px`
				elm$2.style.position = 'fixed'
			} else {
				elm$2.style.top = ''
				elm$2.style.position = 'absolute'
			}
		} else {
			let _size = defaultFontSize - window.scrollY * (defaultFontSize - finalFontSize) / (elm$2.clientHeight - 3 * _bodyFontSize)
			
			console.log(window.scrollY)
			if (window.scrollY >= elm$2.clientHeight - 3 * _bodyFontSize) {
				elm$2.style.top = `-${elm$2.clientHeight - 3 * _bodyFontSize}px`
			} else {
				elm$2.style.top = ''
				elm$3.style.paddingTop = `${elm$3pt * _bodyFontSize + window.scrollY * (1 - 1.1 * _bodyFontSize / (elm$2.clientHeight - 3 * _bodyFontSize))}px`
				elm$3.style.fontSize = `${_size * _bodyFontSize}px`
				elm$4.style.opacity = window.scrollY <= 50 ? `${1 - window.scrollY / 50}` : 0
			}
		}
	}

	render() {
		
		let iscate = isCategory(this.props.paramId)
		let child = <TimelineList categoryId={this.props.paramId == '' ? '0' : this.props.paramId}/>
		
		iscate == null && this.state.doc != '' ? child = <Document doc={this.state.doc}/> : 404
		
		let articlebgcolor = this.state.bgphoto.split('&')[0]
		let articlebgimg = this.state.bgphoto.split('&')[1]
		
		return (
			<div className="fm-article" style={iscate != null ? {overflow: 'hidden'} : {}}>
			<ReactCSSTransitionGroup
				component="div" transitionName="example"
        transitionEnterTimeout={500} transitionLeaveTimeout={500}
			>
				<div ref="articleProfile" className="articleprofile" style={{
					backgroundColor: articlebgcolor == '' ? '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6) : articlebgcolor,
					borderBottom: iscate != null ? '' : '1rem solid #fff'
				}}>
					<p ref="articleprofiletitle" className="articleprofiletitle" style={this.state.bgphoto.indexOf('.') >= 0 ? {} : {color: '#fff'}}>{this.state.title}</p>
					<p ref="articleprofiletext" className="articleprofiletext" style={this.state.bgphoto.indexOf('.') >= 0 ? {} : {color: '#fff'}}>{this.state.subtitle}</p>
					{articlebgimg != '' && <div className="articlebgimg" style={{background: `url(${articlebgimg}) center bottom no-repeat`}}></div>}
				</div>
				<div className="articlelist" style={iscate != null ? {paddingTop: '13rem'} : {paddingTop: '15rem'}}>{child}</div>
			</ReactCSSTransitionGroup>
			</div>
		)
	}
}

export default ArticlePaper
