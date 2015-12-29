
import React, { PropTypes, Component } from 'react'
import { render } from 'react-dom'
import ArticlePaper from '../../components/ArticlePaper'
import AuthorInfo from '../../components/AuthorInfo'
import NavBar from '../../components/NavBar'
import Tags from '../../components/Tags'
import TimelineList from '../../components/TimelineList'

class HomePage extends Component {

	render() {

		let { id } = this.props.params

		return (
			<div className="fm-body">
				<div className="fm-l">
					<AuthorInfo />
					<NavBar paramId={id}/>
					<Tags paramId={id}/>
				</div>
				<div className="fm-r">
					<ArticlePaper paramId={id} />
				</div>
			</div>
		)
	}
}

export default HomePage
