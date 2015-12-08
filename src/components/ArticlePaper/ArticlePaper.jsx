
import React, { PropTypes, Component } from 'react';
import { cid, pid, clist } from '../../cache/cache';
import TimelineList from '../TimelineList';
import Document from '../Document';

import './style.less';

class ArticlePaper extends Component {
	static propTypes = {
		paramId: PropTypes.string.isRequired,
		articleID: PropTypes.string.isRequired
	};

	static defaultProps = {
		paramId: 'home',
		articleID: ''
	};

	constructor(props) {
    super(props);
    if (cid.indexOf(this.props.paramId) != -1) {
			let _category = clist[cid.indexOf(this.props.paramId)]
			this.state = {
				type: 'category',
				title: _category.title,
				profile: _category.profile,
				bgimg: _category.bgimg
			}
		} else if (pid.indexOf(this.props.paramId) != -1) {
			let _article = clist[0].posts[pid.indexOf(this.props.paramId)]
			this.state = {
	    	type: 'article',
				title: _article.title,
				profile: _article.profile,
				bgimg: _article.bgimg,
				detail: _article.detail
			}
		}
  }

	componentWillReceiveProps(){
		if (cid.indexOf(this.props.paramId) != -1) {
			let _category = clist[cid.indexOf(this.props.paramId)]
			this.setState({
				type: 'category',
				title: _category.title,
				profile: _category.profile,
				bgimg: _category.bgimg
			})
		} else if (pid.indexOf(this.props.paramId) != -1) {
			let _article = clist[0].posts[pid.indexOf(this.props.paramId)]
			this.setState({
	    	type: 'article',
				title: _article.title,
				profile: _article.profile,
				bgimg: _article.bgimg,
				detail: _article.detail
			})
		}
	}

	render() {

		let child
		switch(this.state.type){
			case 'article':
				child = <Document postId={this.props.paramId}/>
				break
			case 'category':
				child = <TimelineList categoryId={this.props.paramId}/>
				break
		}

		return (
			<div className="fm-article" style={this.state.type == 'category' ? {overflow: 'hidden'} : {}}>
				<div className="articleprofile" style={this.state.bgimg.indexOf('.') >= 0 ? {} : {backgroundColor: this.state.bgimg}}>
					<p className="articleprofiletitle" style={this.state.bgimg.indexOf('.') >= 0 ? {} : {color: '#fff'}}>{this.state.title}</p>
					<p className="articleprofiletext" style={this.state.bgimg.indexOf('.') >= 0 ? {} : {color: '#fff'}}>{this.state.profile}</p>
					{this.state.bgimg.indexOf('.') >= 0 ? <img src={this.state.bgimg} alt=""/> : null}
				</div>
				<div className="articlelist">{child}</div>
			</div>
		);
	}
}

export default ArticlePaper;
