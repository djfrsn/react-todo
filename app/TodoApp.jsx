import React, { Component, PropTypes } from 'react';
import Firebase from 'firebase';
import Store from './Store';
import utils from 'utils';
import Header from 'Header';
import TodoContainer from 'TodoContainer';
import Footer from 'Footer';
import PageFooter from 'PageFooter';
import classNames from 'classnames/bind';
import styles from './TodoApp.css';

const cx = classNames.bind(styles);

export default class TodoApp extends Component {
  constructor(props) {
    super(props);
    let localData = utils.store('TodoAppState');
    this.fireData = new Firebase('https://djfrsn-react-todo.firebaseio.com/state');
    this.fireData.on('value', (snapshot) => {
      this.setState(snapshot.val()); // sync with db data
    });
    if (localData.length === 0) {
      localData = { todos: [], activeVisibilityFilter: 'all' };
    }
    this.store = new Store(this.refresh.bind(this), localData); // local storage first
    this.state = this.store.getState();
    const routes = ['active', 'completed'];
    const childRoute = props.location.pathname.split('/')[1];
    if (routes.indexOf(childRoute) >= 0) {
      this.childRoute = childRoute;
    }
  }
  componentWillMount() {
    if (this.childRoute) {
      this.store.dispatch({ type: 'VISIBILITY_FILTER', filter: this.childRoute, browserStatePush: false });
    }
  }
  refresh = (state) => {
    utils.store('TodoAppState', state);
    this.fireData.set(state);
    this.setState(state);
  }
  dispatch = (action) => {
    this.store.dispatch(action);
  }
  render() {
    return (<div>
        <section className={cx('todoapp')}>
          <Header dispatch={this.dispatch} />
          <TodoContainer {...this.state} dispatch={this.dispatch} />
          <Footer {...this.state} dispatch={this.dispatch} />
        </section>
        <PageFooter />
      </div>);
  }
}

TodoApp.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  })
};
