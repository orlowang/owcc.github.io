
import React, { PropTypes, Component } from 'react'
import { __Check } from '../../lib/util'
import './style.less'

class ThirdCmpts extends Component {

	static propTypes = {
		thread: PropTypes.string.isRequired,
		shortName: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired
	};

	static defaultProps = {
		thread: '',
		shortName: 'commentforgithub',
		url: ''
	}

	constructor() {
    super()
  }

	componentDidMount() {
		//  初始化多说
		window.duoshuoQuery = {short_name: this.props.shortName}
		require('../../lib/embed.js')
		DUOSHUO.EmbedThread('.TCduoshuo')
	}

	render() {
		return (
			<div ref="DuoShuo" className="TCduoshuo" data-thread-key={this.props.thread} data-url={this.props.url}></div>
		)
	}
}

export default ThirdCmpts
