import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.css';

const cx = classNames.bind(styles);
const ENTER_KEY = 13;
// import our base child components

export default class Header extends Component {
  keyAction = (e) => {
    const val = e.currentTarget.value.trim();
    if (e.keyCode === ENTER_KEY && val) {
      e.currentTarget.value = '';
      this.props.dispatch({
        type: 'NEW_TODO',
        text: val
      });
    }
  }
  render() {
    return (<header className={cx('header')}>
        <h1>todos</h1>
        <input className={cx('new-todo')} onKeyUp={this.keyAction} onplaceholder="What needs to be done?" autoFocus />
      </header>);
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
