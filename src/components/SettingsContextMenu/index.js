import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import ContextMenu from 'components/ContextMenu';
import SortByContextMenu from 'components/SortByContextMenu';

import styles from './styles/index.css';

@inject('view_store')
@observer
@CSSModules(styles)
class TorrentContextMenu extends Component {
  @autobind onAbout() {
    this.props.view_store.toggleAboutDialog();
  }

  @autobind onStatistics() {
    this.props.view_store.toggleStatisticsDialog();
  }

  @autobind onToggleSortByContextMenu() {
    this.props.view_store.toggleSortByContextMenu();
  }

  @autobind onToggleContextMenu() {
    // TODO: Move it to ContextMenu component
    this.props.view_store.toggleContextMenus();
  }

  render() {
    return (
      <ContextMenu
        show={this.props.show}
        container={this.props.container}
        target={this.props.target}
        onHide={this.props.onHide}
      >
        <ul styleName='torrentMenu' onClick={this.onToggleContextMenu}>
          <li styleName='torrentMenuItem' onClick={this.onAbout}>About</li>
          <li styleName='torrentMenuSeparator' />
          <li styleName='torrentMenuItem'>
            <a href='http://transmissionbt.com/' target='_blank'>
              Transmission Home page
            </a>
          </li>
          <li styleName='torrentMenuItem'>
            <a href='http://transmissionbt.com/donate/' target='_blank'>
              Transmission Tip Jar
            </a>
          </li>
          <li styleName='torrentMenuSeparator' />
          <li styleName='torrentMenuItem' onClick={this.onStatistics}>Statistics</li>
          <li styleName='torrentMenuSeparator' />
          <li
            ref='target'
            styleName={this.props.view_store.isSortByContextMenuShown ? 'torrentMenuSelected' : 'torrentMenuSubitem'}
            onMouseEnter={this.onToggleSortByContextMenu}
            onMouseLeave={this.onToggleSortByContextMenu}
          >
            Sort Transfers By
            <SortByContextMenu
              show={this.props.view_store.isSortByContextMenuShown}
              container={this.props.container}
              target={() => findDOMNode(this.refs.target)}
              onHide={this.props.onHide}
            />
          </li>
        </ul>
      </ContextMenu>
    );
  }
}

export default TorrentContextMenu;
