
import React, { PropTypes, Component } from 'react';
import { category } from '../../static.config';
import './style.less';

class TimelineList extends Component {
	static propTypes = {
		cateId: PropTypes.string.isRequired
	};

	static defaultProps = {
		cateId: ''
	};

	render() {
		let catelist = []
		for (var i = 0; i < category.length; i++) {
			catelist.push(category[i].id)
		}
		
		return (
			<div className="fm-timeline">
				<div className="timeline">
					<div className="yearland">
						<div className="yearpoint"></div>
						<div className="year">2015Year</div>
					</div>
				</div>
				<div className="lestcardcontainer">
					<div className="listcard">
						<div className="header">
								<div className="timepoint"></div>
								<div className="date">1/13</div>
								<a className="title" href="##">this is a article title.</a>
						</div>
						<img className="cardcover" src="post1000.jpg" alt=""/>
						<div className="footer">
							<p className="text">this is a article profile. this is a article profile. this is a article profile. this is a article profile. this is a article profile. this is a article profile. </p>
						</div>
					</div>
					<div className="listcard">
						<div className="header">
								<div className="timepoint"></div>
								<div className="date">1/13</div>
								<a className="title" href="##">this is a article title.</a>
						</div>
						<img className="cardcover" src="post1000.jpg" alt=""/>
						<div className="footer">
							<p className="text">this is a article profile. this is a article profile. this is a article profile. this is a article profile. this is a article profile. this is a article profile. </p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default TimelineList;
