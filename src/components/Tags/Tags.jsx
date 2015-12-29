
import React, { PropTypes, Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Link } from 'react-router'
import { categorys } from '../../cache/datacache'
import { witchCategory, isCategory } from '../../lib/util'
import './style.less'

class Tags extends Component {
	static propTypes = {
		tagsTitle: PropTypes.string.isRequired,
		paramId: PropTypes.string.isRequired
	};

	static defaultProps = {
		tagsTitle: '',
		paramId: ''
	}

	render() {

		let _cate = witchCategory(this.props.paramId)

		// 这里注意使用map！如果使用for循环会导致link(componentWillUpdate)触发两次
		let tagsitem = categorys.map(function(cate, i){
			return (
				<li key={i} className="list">
					<Link activeClassName="on" className={_cate == cate.id ? 'on' : ''} to={cate.id}><span>{cate.title}</span></Link>
				</li>
			)
		})

		return (
			<div className="tags">
				<div className="tagstitle">
					<p className="titletext">{this.props.tagsTitle}</p>
				</div>
				<ul className="tagslist">
					{tagsitem}
				</ul>
			</div>
		);
	}
}

export default Tags;
