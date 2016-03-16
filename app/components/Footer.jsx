import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.css';

const cx = classNames.bind(styles);

export default class Footer extends Component {
  render() {
    const todosLength = this.props.todos.length;
    const footerClass = cx({
      'footer': true,
      'hidden': todosLength > 0 ? false : true
    });
    // TODO: check for completed todos or not on whether to hide or show here
    const clearCompletedClass = cx({
      'clear-completed': true,
      'hidden': todosLength > 0 ? false : true
    });
    return (<footer className={footerClass}>
        <span className={cx('todo-count')}><strong>{todosLength}</strong> item left</span>
        <ul className={cx('filters')}>
          <li>
            <a className={cx('selected')} href="#/">All</a>
          </li>
          <li>
            <a href="#/active">Active</a>
          </li>
          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>
        <button className={clearCompletedClass}>Clear completed</button>
      </footer>);
  }
}
Footer.propTypes = {
  todos: PropTypes.array
};
