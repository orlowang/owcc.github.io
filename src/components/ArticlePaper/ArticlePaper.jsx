
import React, { PropTypes, Component } from 'react'
import TimelineList from '../TimelineList'
import Document from '../Document'
import DuoShuo from '../DuoShuo'
import { fetchMarkdown, parseMarkdown, isCategory } from '../../lib/util'
import { homeset, categorys } from '../../static.config'

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
	componentWillUpdate() {
		let timer = setInterval(() => {
			this.refs.article.scrollTop > 0 ? this.refs.article.scrollTop -= this.refs.article.scrollTop * .2 : clearInterval(timer)
		}, 10)
		this.scrollHandle()
	}

	componentDidMount() {
		this.scrollHandle()
		// this.refs.article.addEventListener('touchstart', (e) => {
		// 	let _this = this.refs.article
		// 	let _startY = e.touches[0].pageY
		// 	this.refs.article.addEventListener('touchmove', (e) => {
		// 		if (_this.scrollTop > 0 && _startY < e.changedTouches[0].pageY) {
		// 			console.log('down!')
		// 		}
		// 	})
		// })
		this.refs.article.addEventListener('scroll', this.scrollHandle())
	}

	componentWillUnmount() {
		this.refs.article.removeEventListener('scroll', this.scrollHandle())
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
		return () => {
			let elm$2 = this.refs.articleProfile
			let elm$3 = this.refs.articleprofiletitle
			let elm$4 = this.refs.articleprofiletext
			let elm$3_style = document.defaultView.getComputedStyle(elm$3, null)
			let _screenX = document.body.clientWidth
			let _scroy = this.refs.article.scrollTop
			let _bodyFontSize = parseInt(document.defaultView.getComputedStyle(document.body, null).fontSize)
			
			let elm$3finalHeight = 3
			let defaultFontSize = 2.4
			let finalFontSize = 1.3				       // 单位rem
			let elm$3defaultTop = 3							 // elm$3Top值
			let elm$3finalTop = .48							 // elm$3Top值
			let elm$3defaultLeft = 6.7
			let elm$3finalLeft = 15.1     // 单位%

			if (_screenX >= 750) {
				if (_scroy >= elm$2.clientHeight - 4) {
					elm$2.style.top = `-${elm$2.clientHeight - 4}px` 
					elm$2.style.position = 'fixed'
				} else {
					elm$2.style.top = ''
					elm$2.style.position = 'absolute'
				}
			} else {
				let _percent = _scroy / (elm$2.clientHeight - elm$3finalHeight * _bodyFontSize)
				let _size = defaultFontSize - _percent * (defaultFontSize - finalFontSize)
				_scroy < 0 && _scroy == 0
				_size >= 2.3 && _size == 2.3
				console.log(_scroy)
				if (_scroy <= 0) {
					elm$3.style.position = 'absolute'
				} else if (_scroy >= elm$2.clientHeight - elm$3finalHeight * _bodyFontSize) {
					elm$2.style.top = `-${elm$2.clientHeight - elm$3finalHeight * _bodyFontSize}px`
					elm$2.style.position = 'fixed'
					elm$2.style.boxShadow = '0 1px 5px rgba(0,0,0,.2)'
					elm$3.style.position = 'fixed'
				} else {
					elm$2.style.boxShadow = 'none'
					elm$3.style.position = 'fixed'
					elm$2.style.top = `-${_scroy}px`
					elm$3.style.top = `${_bodyFontSize * (elm$3defaultTop - _percent * (elm$3defaultTop - elm$3finalTop))}px`
					elm$3.style.fontSize = `${_size}em`
					elm$3.style.left = `${elm$3defaultLeft + _percent * (elm$3finalLeft - elm$3defaultLeft)}%`
					elm$4.style.opacity = _scroy <= 100 ? `${1 - _scroy / 100}` : 0
				}
			}
		}
	}

	render() {
		
		let iscate = isCategory(this.props.paramId)
		let _screenX = document.body.clientWidth
		let child = <TimelineList categoryId={this.props.paramId == '' ? '0' : this.props.paramId}/>
		
		iscate == null && this.state.doc != '' ? child = <Document doc={this.state.doc}/> : 404
		
		let articlebgcolor = this.state.bgphoto.split('&')[0]
		let articlebgimg = this.state.bgphoto.split('&')[1]
		
		return (
			<div ref="article" className="fm-article">
				<div ref="articleProfile" className="articleprofile" style={{
					backgroundColor: articlebgcolor == '' ? '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6) : articlebgcolor,
					borderBottom: _screenX >= 750 && iscate == null && this.props.paramId != 0 ? '1rem solid #fff' : 0,
					boxShadow: _screenX >= 750 && iscate == null && this.props.paramId != 0 ? 'none' : '0 2px 2px rgba(0,0,0,.06)'
				}}>
					<p ref="articleprofiletitle" className="articleprofiletitle" style={this.state.bgphoto.indexOf('.') >= 0 ? {} : {color: '#fff'}}>{this.state.title}</p>
					<p ref="articleprofiletext" className="articleprofiletext" style={this.state.bgphoto.indexOf('.') >= 0 ? {} : {color: '#fff'}}>{this.state.subtitle}</p>
					{articlebgimg != ''&& articlebgimg != undefined && <div className="articlebgimg" style={{background: `url(${articlebgimg}) center bottom no-repeat`}}></div>}
				</div>
				<div className="articlelist" style={{
					paddingTop: iscate == null && this.props.paramId != 0 ? '15rem' : '13rem',
					backgroundColor: iscate == null && this.props.paramId != 0 ? '#fff' : 'transparent'
				}}>{child}</div>
				{(iscate == null && this.props.paramId != 0) && <DuoShuo thread={this.props.paramId} url={this.state.title}/>}
			</div>
		)
	}
}

export default ArticlePaper
