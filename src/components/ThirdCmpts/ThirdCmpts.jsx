
import React, { PropTypes, Component } from 'react'

import './style.less'

class ThirdCmpts extends Component {

	static propTypes = {
		thread: PropTypes.string.isRequired,
		shortName: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired
	};

	static defaultProps = {
		thread: '',
		shortName: '',
		url: ''
	}

	constructor() {
    super()
  }

	componentDidMount() {
		window.duoshuoQuery = this.props.shortName
		//  初始化多说
		let duoshuoQuery = {short_name: 'commentforgithub'}
		let ds = document.createElement('script')
    ds.type = 'text/javascript';ds.async = true
    ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js'
    ds.charset = 'UTF-8'
    document.getElementsByTagName('body')[0].appendChild(ds)
    // console.log(duoshuoQuery)
    let timer = setInterval(() => {
    	DUOSHUO && DUOSHUO.EmbedThread(this.refs.DuoShuo)
    }, 10)
	}

	render() {
		return (
			<div ref="DuoShuo" className="TCduoshuo" data-thread-key={this.props.thread} data-url={this.props.url}></div>
		)
	}
}

export default ThirdCmpts
