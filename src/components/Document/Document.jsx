
import React, { PropTypes, Component } from 'react';
import marked from 'marked';
import fetch from 'whatwg-fetch';
import { docrsp } from '../../static.config';

import './style.less';

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

  componentWillReceiveProps(){
  	let that = this;
		let url = `${docrsp}/${this.props.postId}.md`;
		
		let rest = fetch(url);
		rest.then(function(response) {
	    return response.text()
	  }).then(function(body) {
	    that.setState({
	    	detail: parse(body)
	    })
	  })
  }

	componentDidMount(){
		let that = this;
		let url = `${docrsp}/${this.props.postId}.md`;
		
		let rest = fetch(url);
		rest.then(function(response) {
	    return response.text()
	  }).then(function(body) {
	    that.setState({
	    	detail: parse(body)
	    })
	  })
	}

	render() {
		return (
			<div className="document">
				<div className="documentcontainer" dangerouslySetInnerHTML={{__html: this.state.detail}}></div>
			</div>
		);
	}
}

export default Document;
