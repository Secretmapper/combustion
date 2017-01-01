import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { inject } from 'mobx-react';
import autobind from 'autobind-decorator';

import ContextMenu from 'components/ContextMenu';

import styles from './styles/index.css';

@inject('view_store', 'torrents_store')
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
    this.props.torrents_store.setSortCriteria(sortCriteria)
  }

  render() {
    const { sortCriteria, sortDirection } = this.props.torrents_store;

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
          <li styleName={sortCriteria === 'queue_order' ? 'torrentMenuSelected' : 'torrentMenuItem'} onClick={this.onSetSortCriteria.bind(this, 'queue_order')}>Queue Order</li>
          <li styleName={sortCriteria === 'activity' ? 'torrentMenuSelected' : 'torrentMenuItem'} onClick={this.onSetSortCriteria.bind(this, 'activity')}>Activity</li>
          <li styleName={sortCriteria === 'age' ? 'torrentMenuSelected' : 'torrentMenuItem'} onClick={this.onSetSortCriteria.bind(this, 'age')}>Age</li>
          <li styleName={sortCriteria === 'name' ? 'torrentMenuSelected' : 'torrentMenuItem'} onClick={this.onSetSortCriteria.bind(this, 'name')}>Name</li>
          <li styleName={sortCriteria === 'percent_completed' ? 'torrentMenuSelected' : 'torrentMenuItem'} onClick={this.onSetSortCriteria.bind(this, 'percent_completed')}>Progress</li>
          <li styleName={sortCriteria === 'ratio' ? 'torrentMenuSelected' : 'torrentMenuItem'} onClick={this.onSetSortCriteria.bind(this, 'ratio')}>Ratio</li>
          <li styleName={sortCriteria === 'size' ? 'torrentMenuSelected' : 'torrentMenuItem'} onClick={this.onSetSortCriteria.bind(this, 'size')}>Size</li>
          <li styleName={sortCriteria === 'state' ? 'torrentMenuSelected' : 'torrentMenuItem'} onClick={this.onSetSortCriteria.bind(this, 'state')}>State</li>
          <li styleName='torrentMenuSeparator' />
          <li styleName={sortDirection === 'ascending' ? 'torrentMenuSelected' : 'torrentMenuItem'}>Reverse Sort Order</li>
        </ul>
      </ContextMenu>
    );
  }
}

export default SortByContextMenu;
