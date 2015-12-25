
import React, { PropTypes, Component } from 'react';
import { render } from 'react-dom';
import { createHistory, useQueries } from 'history';
import { Router, Route } from 'react-router'
import HomePage from './layout/HomePage';
import NoPage from './layout/NoPage';
import ArticlePaper from './components/ArticlePaper';
import 'normalize.css';
import 'animate.css/animate.min.css';
import './assets/init.less';

const history = createHistory()

render((
	<Router history={history}>
		<Route path="/" component={HomePage}> 
			<Route path=":id" component={ArticlePaper}/>
			<Route path="*" component={NoPage}/>
		</Route>
	</Router>
), document.getElementById('fmContainer'))
