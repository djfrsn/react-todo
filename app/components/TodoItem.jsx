import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import styles from './TodoContainer.css';

const cx = classNames.bind(styles);
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;
// import our base child components

export default class TodoItem extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.editing && this.props.editing) {
      const node = ReactDOM.findDOMNode(this.refs.editField);
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }
  onDestroyTodo = () => {
    this.props.dispatch({
      type: 'DESTROY_TODO',
      id: this.props.id
    });
  }
  onTodoToggle = () => {
    this.props.dispatch({
      type: 'MARK_AS_COMPLETED',
      id: this.props.id
    });
  }
  onEditTodo = () => {
    this.props.dispatch({
      type: 'EDIT_TODO',
      id: this.props.id
    });
  }
  updateTodo = (val) => {
    this.props.dispatch({
      type: 'UPDATE_TODO',
      id: this.props.id,
      text: val
    });
  }
  handleTodoUpdate = (e) => {
    const val = e.currentTarget.value.trim();
    if ( e.type === 'blur' || e.keyCode === ENTER_KEY || e.keyCode === ESCAPE_KEY ) {
      if (val) {
        this.updateTodo(val);
      } else {
        this.onDestroyTodo();
      }
    }
  }
  render() {
    const liClass = cx({
      'editing': this.props.editing,
      'completed': this.props.completed
    });
    return (<li  className={liClass}>
        <div className={cx('view')}>
          <input className={cx('toggle')} type="checkbox" onClick={this.onTodoToggle} checked={this.props.completed} />
          <label onDoubleClick={this.onEditTodo}>{this.props.text}</label>
          <button className={cx('destroy')} onClick={this.onDestroyTodo}></button>
        </div>
        <input className={cx('edit')} defaultValue={this.props.text} onKeyUp={this.handleTodoUpdate} onBlur={this.handleTodoUpdate} ref="editField"/>
      </li>);
  }
}

TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  checked: PropTypes.bool,
  editing: PropTypes.bool,
  text: PropTypes.string
};
