import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './TodoContainer.css';
// import our base child components
const cx = classNames.bind(styles);

export default class TodoContainer extends Component {
  render() {
    const todos = this.props.todos.map((data) => {
      const liClass = cx({
        'toggle': data.toggle,
        'editing': data.editing,
        'edit': data.edit,
        'completed': data.completed,
        'destroy': data.destroy
      });
      return (<li key={data.id} className={liClass}>
          <div className={cx('view')}>
            <input className={cx('toggle')} type="checkbox" checked={data.checked} />
            <label>{data.text}</label>
            <button className={cx('destroy')}></button>
          </div>
          <input className={cx('edit')} defaultValue="Create a TodoMVC template" />
        </li>);
    });
    return (<section className={cx('main')}>
        <input className={cx('toggle-all')} type="checkbox" ></input>
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className={cx('todo-list')}>
          {todos}
        </ul>
      </section>);
  }
}

TodoContainer.propTypes = {
  visibilityFilter: PropTypes.string,
  todos: PropTypes.arrayOf(PropTypes.shape({
    checked: PropTypes.bool,
    text: PropTypes.string
  }))
};
