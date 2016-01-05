
import React, { PropTypes, Component } from 'react'
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
		let iscate = isCategory(nextProps.paramId)
		if (nextProps.paramId == '') {
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
				fetchMarkdown(nextProps.paramId, (body)=>{
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

	componentWillMount() {
		let iscate = isCategory(this.props.paramId)
		if (iscate != null) {
			this.setState({
				title: categorys[iscate].title,
				subtitle: categorys[iscate].subtitle,
				bgphoto: categorys[iscate].bgphoto
			})
		} else {
			let that = this
			fetchMarkdown(this.props.paramId, (body)=>{
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

	componentDidMount() {
		this.refs.articlePaper.addEventListener('scroll', this.scrollHandle.bind(this))
	}

	componentWillUnmount() {
		this.refs.articlePaper.removeEventListener('scroll', this.scrollHandle.bind(this))
	}

	scrollHandle(){
		let elm$1 = this.refs.articlePaper
		let elm$2 = this.refs.articleProfile
		if (elm$1.scrollTop >= elm$2.clientHeight - 4) {
			elm$2.style.position = 'fixed'
			elm$2.style.top = `-${elm$2.clientHeight - 4}px`
		}
		if (elm$1.scrollTop < elm$2.clientHeight - 4) {
			elm$2.style.position = ''
			elm$2.style.top = ''
		}
	}

	render() {
		
		let iscate = isCategory(this.props.paramId)
		let child = <TimelineList categoryId={this.props.paramId == '' ? '0' : this.props.paramId}/>
		
		iscate == null && this.state.doc != '' ? child = <Document doc={this.state.doc}/> : 404
		
		return (
			<div ref="articlePaper" className="fm-article" style={iscate != null ? {overflow: 'hidden'} : {}}>
				<div ref="articleProfile" className="articleprofile" style={this.state.bgphoto.indexOf('.') >= 0 ? {} : {backgroundColor: this.state.bgphoto}}>
					<p className="articleprofiletitle" style={this.state.bgphoto.indexOf('.') >= 0 ? {} : {color: '#fff'}}>{this.state.title}</p>
					<p className="articleprofiletext" style={this.state.bgphoto.indexOf('.') >= 0 ? {} : {color: '#fff'}}>{this.state.subtitle}</p>
					{this.state.bgphoto.indexOf('.') >= 0 ? <img src={this.state.bgphoto} alt=""/> : null}
				</div>
				<div className="articlelist" style={iscate != null ? {paddingTop: '13rem'} : {paddingTop: '15rem'}}>{child}</div>
			</div>
		)
	}
}

export default ArticlePaper
