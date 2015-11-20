
import { PropTypes, Component } from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router'
import HomePage from './layout/HomePage';
import 'normalize.css';
import './assets/init.less';

render((
	<Router>
		<Route path="/" component={HomePage}>
		</Route>
	</Router>
), document.body)
