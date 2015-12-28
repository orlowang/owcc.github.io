
import React, { PropTypes, Component } from 'react'
import TimelineList from '../TimelineList'
import Document from '../Document'
import marked from 'marked'
import { homeset, categorys } from '../../cache/datacache'
import { docrsp } from '../../static.config'

import './style.less'

function parse(src, cb) {

	let tmp$1 = src.split('end-->')
	let tmp$2 = tmp$1[0].split('<!--begin')
	let tmp$3 = '{' + tmp$2[1].replace(/[\n]/ig, '') + '}'
	let data = JSON.parse(tmp$3)
	let body = marked(tmp$1[1])

	Object.assign(data, {body: body})
	cb(data)
}

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

		let iscate = this.isCategory(nextProps.paramId)
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
				this.fetchData(nextProps.paramId, (body)=>{
					parse(body, (data)=>{
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

	isCategory(arg){
		let ids = []
		for (let i = 0; i < categorys.length; i++) {
			ids.push(categorys[i].id)
		}
		let index = ids.indexOf(arg)
		return index >= 0 ? index : null
	}

	fetchData(src, cb) {

		let url = `${docrsp}/${src}.md`
		let rest = fetch(url)

		rest.then(function(response) {
	    return response.text()
	  }).then(function(body) {
	    cb(body)
	  })
	}

	render() {
		
		let iscate = this.isCategory(this.props.paramId)
		let child = <TimelineList categoryId={this.props.paramId == '' ? '0' : this.props.paramId}/>
		
		iscate == null && this.state.doc != '' ? child = <Document doc={this.state.doc}/> : 404
		
		return (
			<div className="fm-article" style={iscate != null ? {overflow: 'hidden'} : {}}>
				<div className="articleprofile" style={this.state.bgphoto.indexOf('.') >= 0 ? {} : {backgroundColor: this.state.bgphoto}}>
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
