
import React, { PropTypes, Component } from 'react';
import marked from 'marked';
import fetch from 'whatwg-fetch';

function parse (src) {
	return marked(src)
}

class Document extends Component {
	static propTypes = {
		postId: PropTypes.string.isRequired
	};

	static defaultProps = {
		
		postId: ''
	};

	constructor(props) {
    super(props)
    this.state = {
    	detail: 'loading...'
    }
  }

	componentDidMount(){
		let that = this;
		let url = 'https://raw.githubusercontent.com/wmkcc/ivewong.github.io/master/_posts/2015-1-21-XHProf%E8%B0%83%E8%AF%95%E5%B7%A5%E5%85%B7%E7%9A%84%E5%AE%89%E8%A3%85%E4%BD%BF%E7%94%A8.md';
		
		let rest = fetch(url);
		rest.then(function(response) {
	    return response.text()
	  }).then(function(body) {
      console.log('got body', body)
	    that.setState({
	    	detail: parse(body)
	    })
	  })

	  fetch(url, {
	  	method: 'post',

	  })
	}

	render() {
		return (
			<div className="fm-nav">
				<div className="nav-title">
					<div dangerouslySetInnerHTML={{__html: this.state.detail}}></div>
				</div>
			</div>
		);
	}
}

export default Document;
