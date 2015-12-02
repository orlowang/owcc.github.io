
import React, { PropTypes, Component } from 'react';
import { welcome, posts, category } from '../../static.config';
import fetch from 'whatwg-fetch';
import TimelineList from '../TimelineList';
import Document from '../Document';

import './style.less';

class ArticlePaper extends Component {
	static propTypes = {
		paramId: PropTypes.string.isRequired,
		articleID: PropTypes.string.isRequired,
		articleTitle: PropTypes.string.isRequired,
		articleProfile: PropTypes.string.isRequired,
		articleProfileBg: PropTypes.string.isRequired
	};

	static defaultProps = {
		paramId: '',
		articleID: '',
		articleTitle: welcome.title,
		articleProfile: welcome.profile,
		articleProfileBg: welcome.bgimg
	};

	constructor(props) {
    super(props);
    this.state = {title: ''};
  }

	componentDidMount(){
		let that = this;
		let url = 'https://raw.githubusercontent.com/wmkcc/ivewong.github.io/master/CNAME';
		
		let rest = fetch(url);
		rest.then(function(response){
			console.log(response)
		}).then(function(text) {
      console.log('got text', text)
	    that.setState({
	    	title: text
	    })
	  })
	}

	render() {

		let child
		let doclist = []
		let catelist = []
		
		for (var i = 0; i < category.length; i++) {
			catelist.push(category[i].id)
		}

		if (this.props.paramId) {
			child = catelist.indexOf(this.props.paramId) == -1 ? <Document postId={this.props.paramId}/> : <TimelineList cateId={this.props.paramId}/>
		} else{
			child = <TimelineList/>
		}

		for (let i = 0; i < posts.length; i++) {
			doclist.push(<p>{posts[i].title}</p>)
		}

		return (
			<div className="fm-article">
				<div className="articleprofile">
					<p className="articleprofiletitle">{this.props.articleTitle}</p>
					<p className="articleprofiletext">{this.props.articleProfile}</p>
					<img src={this.props.articleProfileBg} alt=""/>
				</div>
				<div className="articlelist">{child}</div>
			</div>
		);
	}
}

export default ArticlePaper;
