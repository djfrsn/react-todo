import React, { Component } from 'react';
import Header from 'Header';
import TodoContainer from 'TodoContainer';
import Footer from 'Footer';
import PageFooter from 'PageFooter';
import classNames from 'classnames/bind';
import styles from './TodoApp.css';

const cx = classNames.bind(styles);


export default class TodoApp extends Component {
  render() {
    const todos = [{
      checked: false,
      text: 'slay dragons'
    }, {
      checked: false,
      text: 'tame dragon'
    }];
    return (<div>
        <section className={cx('todoapp')}>
          <Header />
          <TodoContainer todos={todos} />
          <Footer todos={todos} />
        </section>
        <PageFooter />
      </div>);
  }
}
