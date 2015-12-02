
import React, { PropTypes, Component } from 'react';
import { render } from 'react-dom';
import createHistory from 'history/lib/createBrowserHistory';
// import createHistory as NewHistory from 'history/lib/createHashHistory'
import useQueries from 'history/lib/useQueries';
import { Router, Route } from 'react-router'
import HomePage from './layout/HomePage';
import NoPage from './layout/NoPage';
import ArticlePaper from './components/ArticlePaper';
import 'normalize.css';
import './assets/init.less';

const history=useQueries(createHistory)()

render((
	<Router history={history}>
		<Route path="/" component={HomePage}>
			<Route path=":id" component={ArticlePaper}/>
			<Route path="*" component={NoPage}/>
		</Route>
	</Router>
), document.getElementById('fmContainer'))


// render((
// 	<HomePage />
// ), document.getElementById('fmContainer'))
