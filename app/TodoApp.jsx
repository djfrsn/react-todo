import React, { Component } from 'react';
import Store from './Store';
import Header from 'Header';
import TodoContainer from 'TodoContainer';
import Footer from 'Footer';
import PageFooter from 'PageFooter';
import classNames from 'classnames/bind';
import styles from './TodoApp.css';
const cx = classNames.bind(styles);

export default class TodoApp extends Component {
  constructor() {
    super();
    this.store = new Store(this.refresh.bind(this));
    this.state = this.store.getState();
  }
  refresh = (state) => {
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
