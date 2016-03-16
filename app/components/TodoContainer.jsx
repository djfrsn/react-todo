import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import TodoItem from 'TodoItem';
import styles from './TodoContainer.css';

const cx = classNames.bind(styles);

export default class TodoContainer extends Component {
  onToggleAll = (e) => {
    this.props.dispatch({
      type: 'MARK_ALL_TODOS_COMPLETED',
      checked: e.currentTarget.checked
    });
  }
  render() {
    const todos = this.props.todos.map((data) => {
      return (<TodoItem {...data} key={data.id} id={data.id} dispatch={this.props.dispatch} />);
    });
    const main = cx({
      'main': true,
      'hidden': this.props.todos.length > 0 ? false : true
    });
    return (<section className={main}>
        <input className={cx('toggle-all')} type="checkbox" onClick={this.onToggleAll} checked={this.props.toggleAll}></input>
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className={cx('todo-list')}>
          {todos}
        </ul>
      </section>);
  }
}

TodoContainer.propTypes = {
  visibilityFilter: PropTypes.string,
  toggleAll: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    checked: PropTypes.bool,
    text: PropTypes.string
  }))
};
