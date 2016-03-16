import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.css';

const cx = classNames.bind(styles);

// import our base child components

export default class Header extends Component {
  render() {
    return (<header className={cx('header')}>
        <h1>todos</h1>
        <input className={cx('new-todo')} placeholder="What needs to be done?" autoFocus />
      </header>);
  }
}
