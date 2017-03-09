import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { inject } from 'mobx-react';
import autobind from 'autobind-decorator';

import { Menu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';

import styles from './styles/index.css';

@inject('prefs_store', 'view_store', 'torrents_store')
@CSSModules(styles)
class SortByContextMenu extends Component {
  @autobind onSetSortCriteria(sortCriteria) {
    this.props.prefs_store.setSortCriteria(sortCriteria)
  }

  render() {
    const { sortCriteria, sortDirection } = this.props.prefs_store;
    const criteriaList = {
      queue_order: 'Queue Order',
      activity: 'Activity',
      age: 'Age',
      name: 'Name',
      percent_completed: 'Progress',
      ratio: 'Ratio',
      size: 'Size',
      state: 'State',
    };

    return (
      <Menu
      selectable
        position='auto'
        active={this.props.active}
        onHide={this.props.onHide}
      >
        {Object.keys(criteriaList).map((key) => (
          <MenuItem
            key={key}
            caption={criteriaList[key]}
            onClick={this.onSetSortCriteria.bind(this, key)}
            styleName={sortCriteria === key ? 'torrentMenuSelected' : 'torrentMenuItem'}
          />
        ))}
        <MenuDivider/>
        <MenuItem
          selected={true}
          caption='Reverse Sort Order'
          styleName={sortDirection === 'ascending' ? 'torrentMenuSelected' : 'torrentMenuItem'}
        />
      </Menu>
    );
  }
}

export default SortByContextMenu;
