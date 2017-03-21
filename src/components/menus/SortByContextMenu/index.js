import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { inject } from 'mobx-react';
import autobind from 'autobind-decorator';

import ContextMenu from 'components/menus/ContextMenu';

import styles from './styles/index.css';

@inject('prefs_store', 'view_store', 'torrents_store')
@CSSModules(styles)
class SortByContextMenu extends Component {
  @autobind onToggleSortByContextMenu() {
    this.props.view_store.toggleSortByContextMenu();
  }

  @autobind onToggleContextMenu() {
    // TODO: Move it to ContextMenu component
    this.props.view_store.toggleContextMenus();
  }

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
      <ContextMenu
        show={this.props.show}
        container={this.props.container}
        target={this.props.target}
        onHide={this.props.onHide}
      >
        <ul
          styleName='torrentMenu'
          onClick={this.onToggleContextMenu}
          onMouseEnter={this.onToggleSortByContextMenu}
          onMouseLeave={this.onToggleSortByContextMenu}
        >
          {Object.keys(criteriaList).map((key) => (
            <li key={key} styleName={sortCriteria === key ? 'torrentMenuSelected' : 'torrentMenuItem'} onClick={this.onSetSortCriteria.bind(this, key)}>{criteriaList[key]}</li>
          ))}

          <li styleName='torrentMenuSeparator' />
          <li styleName={sortDirection === 'ascending' ? 'torrentMenuItem' : 'torrentMenuSelected'}>Reverse Sort Order</li>
        </ul>
      </ContextMenu>
    );
  }
}

export default SortByContextMenu;
