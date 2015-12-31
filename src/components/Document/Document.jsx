
import React, { PropTypes, Component } from 'react'
import marked from 'marked'
import { docrsp } from '../../static.config'

import './style.less'

class Document extends Component {
	static propTypes = {
		doc: PropTypes.string.isRequired
	};

	static defaultProps = {
		doc: ''
	};

	render() {
		return (
			<div className="document">
				<div className="documentcontainer" dangerouslySetInnerHTML={{__html: this.props.doc}}></div>
			</div>
		);
	}
}

export default Document
