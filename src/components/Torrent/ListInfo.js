import React, { Component } from 'react'
import CSSModules from 'react-css-modules';
import { inject } from 'mobx-react';

import styles from './styles/listInfo.css';

@inject('view_store', 'torrents_store')
@CSSModules(styles)
export default class ListInfo extends Component {
  render () {
    const { torrents_store: { filter } } = this.props
    const states = this.props.torrents_store.statesWithCount;
    const status = this.props.torrents_store.statusFilter;

    const allCount = states[states.findIndex(o => o.label === 'All')].count;
    const label = states[states.findIndex(o => o.value === status)].label;

    return (
      <div styleName='container'>
        <div>Current Filter: {label}</div>
        <div>({allCount} total torrents)</div>
      </div>
    );
  }
}
