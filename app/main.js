import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from 'TodoApp';
import { Router, Route, browserHistory } from 'react-router';

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={TodoApp} >
      <Route path="/active" component={TodoApp} />
			<Route path="/completed" component={TodoApp} />
		</Route>
	</Router>,
document.getElementById('root'));
