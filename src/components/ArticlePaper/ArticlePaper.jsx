
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

	componentDidMount() {
		let that = this
		window.addEventListener('scroll', this.scrollHandle.bind(that))
	}

	componentWillUnmount() {
		let that = this
		window.removeEventListener('scroll', this.scrollHandle.bind(that))
	}

	scrollHandle(){
		let elm = this.refs.articleProfile
		if (window.scrollY >= elm.clientHeight - 4) {
			elm.style.position = 'fixed'
			elm.style.top = `-${elm.clientHeight - 4}px`
		}
		if (window.scrollY < elm.clientHeight - 4) {
			elm.style.position = ''
			elm.style.top = ''
		}
	}

	render() {
		
		let iscate = isCategory(this.props.paramId)
		let child = <TimelineList categoryId={this.props.paramId == '' ? '0' : this.props.paramId}/>
		
		iscate == null && this.state.doc != '' ? child = <Document doc={this.state.doc}/> : 404
		
		return (
			<div className="fm-article" style={iscate != null ? {overflow: 'hidden'} : {}}>
				<div ref="articleProfile" className="articleprofile" style={this.state.bgphoto.indexOf('.') >= 0 ? {} : {backgroundColor: this.state.bgphoto}}>
					<p className="articleprofiletitle" style={this.state.bgphoto.indexOf('.') >= 0 ? {} : {color: '#fff'}}>{this.state.title}</p>
					<p className="articleprofiletext" style={this.state.bgphoto.indexOf('.') >= 0 ? {} : {color: '#fff'}}>{this.state.subtitle}</p>
					{this.state.bgphoto.indexOf('.') >= 0 ? <img src={this.state.bgphoto} alt=""/> : null}
				</div>
				<div className="articlelist">{child}</div>
			</div>
		)
	}
}

export default ArticlePaper
