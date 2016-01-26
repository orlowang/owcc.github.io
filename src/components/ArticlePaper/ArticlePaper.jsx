
import React, { PropTypes, Component } from 'react'
import TimelineList from '../TimelineList'
import Document from '../Document'
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

	componentDidMount() {
		// window.addEventListener(_screenX >= 750 ? 'scroll' : 'touchmove', this.scrollHandle.bind(this))
		document.body.addEventListener('scroll', function(e) {
			e.preventDefault()
		})
		this.refs.article.addEventListener('scroll', this.scrollHandle.bind(this))
	}

	componentWillUnmount() {
		this.refs.article.removeEventListener('scroll', this.scrollHandle.bind(this))
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
		let _scroy = this.refs.article.scrollTop
		let _bodyFontSize = parseInt(document.defaultView.getComputedStyle(document.body, null).fontSize)
		
		let elm$3finalHeight = 3
		let defaultFontSize = 2.4
		let finalFontSize = 1.3				       // 单位rem
		let elm$3defaultTop = 2							 // elm$3Top值
		let elm$3finalTop = .4							 // elm$3Top值
		let elm$3defaultPaddingLeft = 6.7
		let elm$3finalPaddingLeft = 19.1     // 单位%

		if (_screenX >= 750) {
			if (_scroy >= elm$2.clientHeight - 4) {
				elm$2.style.top = `-${elm$2.clientHeight - 4}px` 
				elm$2.style.position = 'fixed'
				elm$2.style.borderBottom = '1rem solid #fff'
			} else {
				elm$2.style.top = ''
				elm$2.style.position = 'absolute'
				elm$2.style.borderBottom = 'none'
			}
		} else {
			let _percent = _scroy / (elm$2.clientHeight - elm$3finalHeight * _bodyFontSize)
			let _size = defaultFontSize - _percent * (defaultFontSize - finalFontSize)
			_size >= 2.3 && _size == 2.3
			
			_scroy < 0 && _scroy == 0
			if (_scroy <= 0) {
				elm$3.style.position = 'absolute'
			} else if (_scroy >= elm$2.clientHeight - elm$3finalHeight * _bodyFontSize) {
				elm$2.style.top = `-${elm$2.clientHeight - elm$3finalHeight * _bodyFontSize}px`
				elm$2.style.position = 'fixed'
				elm$2.style.boxShadow = '0 1px 5px rgba(0,0,0,.2)'
				elm$3.style.position = 'fixed'
			} else {
				elm$2.style.top = ''
				elm$2.style.position = 'absolute'
				elm$2.style.boxShadow = 'none'
				elm$3.style.position = 'fixed'
				elm$3.style.top = `${_bodyFontSize * (elm$3defaultTop - _percent * (elm$3defaultTop - elm$3finalTop))}px`
				elm$3.style.fontSize = `${_size * _bodyFontSize}px`
				elm$3.style.paddingLeft = `${elm$3defaultPaddingLeft + _percent * (elm$3finalPaddingLeft - elm$3defaultPaddingLeft)}%`
				elm$4.style.opacity = _scroy <= 100 ? `${1 - _scroy / 100}` : 0
			}
		}
	}

	render() {
		
		let iscate = isCategory(this.props.paramId)
		let child = <TimelineList categoryId={this.props.paramId == '' ? '0' : this.props.paramId}/>
		
		iscate == null && this.state.doc != '' ? child = <Document doc={this.state.doc}/> : 404
		
		let articlebgcolor = this.state.bgphoto.split('&')[0]
		let articlebgimg = this.state.bgphoto.split('&')[1]
		console.log(articlebgimg)
		return (
			<div ref="article" className="fm-article">
				<div ref="articleProfile" className="articleprofile" style={{
					backgroundColor: articlebgcolor == '' ? '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6) : articlebgcolor
				}}>
					<p ref="articleprofiletitle" className="articleprofiletitle" style={this.state.bgphoto.indexOf('.') >= 0 ? {} : {color: '#fff'}}>{this.state.title}</p>
					<p ref="articleprofiletext" className="articleprofiletext" style={this.state.bgphoto.indexOf('.') >= 0 ? {} : {color: '#fff'}}>{this.state.subtitle}</p>
					{articlebgimg != ''&& articlebgimg != undefined && <div className="articlebgimg" style={{background: `url(${articlebgimg}) center bottom no-repeat`}}></div>}
				</div>
				<div className="articlelist" style={iscate != null ? {paddingTop: '13rem'} : {paddingTop: '15rem'}}>{child}</div>
			</div>
		)
	}
}

export default ArticlePaper
