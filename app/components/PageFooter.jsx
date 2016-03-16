import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './PageFooter.css';

const cx = classNames.bind(styles);

export default class PageFooter extends Component {
  render() {
    return (<footer className={cx('info')}>
      <p>Double-click to edit a todo</p>
      <p>Written by <a href="http://dennisjefferson.com">Dennis Jefferson</a></p>
      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>);
  }
}
