
import React, { PropTypes, Component } from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router'
import HomePage from './layout/HomePage';
import ArticlePaper from './components/ArticlePaper';
import 'normalize.css';
import './assets/init.less';

render((
	<Router>
		<Route path="/" component={HomePage}>
			<Route path=":articleID" component={ArticlePaper}/>
		</Route>
	</Router>
), document.getElementById('fmContainer'))
