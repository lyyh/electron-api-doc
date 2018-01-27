// @flow
import { Button } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Button><Link to='/login'>to LoginContainer</Link></Button>
        </div>
      </div>
    );
  }
}
