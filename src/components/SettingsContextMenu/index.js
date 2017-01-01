import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import ContextMenu from 'components/ContextMenu';
import SortByContextMenu from 'components/SortByContextMenu';
import RateContextMenu from 'components/RateContextMenu';

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

  @autobind onToggleDownloadRateContextMenu() {
    this.props.view_store.toggleDownloadRateContextMenu();
  }

  @autobind onToggleUploadRateContextMenu() {
    this.props.view_store.toggleUploadRateContextMenu();
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
            ref='downloadRateTarget'
            styleName={this.props.view_store.isDownloadRateContextMenuShown? 'torrentMenuSelected' : 'torrentMenuSubitem'}
            onMouseEnter={this.onToggleDownloadRateContextMenu}
            onMouseLeave={this.onToggleDownloadRateContextMenu}
          >
            Total Download rate
            <RateContextMenu
              direction='down'
              show={this.props.view_store.isDownloadRateContextMenuShown}
              container={this.props.container}
              target={() => findDOMNode(this.refs.downloadRateTarget)}
              onHide={this.props.onHide}
            />
          </li>
          <li
            ref='uploadRateTarget'
            styleName={this.props.view_store.isUploadRateContextMenuShown ? 'torrentMenuSelected' : 'torrentMenuSubitem'}
            onMouseEnter={this.onToggleUploadRateContextMenu}
            onMouseLeave={this.onToggleUploadRateContextMenu}
          >
            Total Upload rate
            <RateContextMenu
              direction='up'
              show={this.props.view_store.isUploadRateContextMenuShown}
              container={this.props.container}
              target={() => findDOMNode(this.refs.uploadRateTarget)}
              onHide={this.props.onHide}
            />
          </li>
          <li styleName='torrentMenuSeparator' />
          <li
            ref='sortByTarget'
            styleName={this.props.view_store.isSortByContextMenuShown ? 'torrentMenuSelected' : 'torrentMenuSubitem'}
            onMouseEnter={this.onToggleSortByContextMenu}
            onMouseLeave={this.onToggleSortByContextMenu}
          >
            Sort Transfers By
            <SortByContextMenu
              show={this.props.view_store.isSortByContextMenuShown}
              container={this.props.container}
              target={() => findDOMNode(this.refs.sortByTarget)}
              onHide={this.props.onHide}
            />
          </li>
        </ul>
      </ContextMenu>
    );
  }
}

export default TorrentContextMenu;
