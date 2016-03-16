import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.css';

const cx = classNames.bind(styles);

export default class Footer extends Component {
  onClearCompleted = () => {
    this.props.dispatch({
      type: 'CLEAR_COMPLETED_TODOS'
    });
  }
  render() {
    let todosCompleted = 0;
    this.props.todos.forEach((todo) => {
      if (todo.completed) {
        todosCompleted++;
      }
    });

    const clearCompletedClass = cx({
      'clear-completed': true,
      'hidden': todosCompleted > 0 ? false : true
    });

    const todosLength = this.props.todos.length;
    const theLetterS = todosLength > 1 ? 's' : '';
    const footerClass = cx({
      'footer': true,
      'hidden': todosLength > 0 ? false : true
    });
    return (<footer className={footerClass}>
        <span className={cx('todo-count')}><strong>{todosLength}</strong> item{theLetterS} left</span>
        <ul className={cx('filters')}>
          <li>
            <a className={cx('selected')} href="/">All</a>
          </li>
          <li>
            <a href="/active">Active</a>
          </li>
          <li>
            <a href="/completed">Completed</a>
          </li>
        </ul>
        <button className={clearCompletedClass} onClick={this.onClearCompleted}>Clear completed</button>
      </footer>);
  }
}
Footer.propTypes = {
  todos: PropTypes.array,
  dispatch: PropTypes.func.isRequired
};
