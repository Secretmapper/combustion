import React  from 'react';
import CSSModules from 'react-css-modules';
import { inject } from 'mobx-react';
import autobind from 'autobind-decorator';

import styles from './styles/index.css';

import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';

@inject('torrents_store', 'view_store')
@CSSModules(styles)
export default class MoveOptions extends React.Component {
  state = { isActive: false };
  onActive = () => this.setState({ isActive: true });
  onHide = () => this.setState({ isActive: false });

  @autobind queueMoveTop() {
    this.props.torrents_store.queueMoveTop(this.props.view_store.selectedTorrents);
  }

  @autobind queueMoveUp() {
    this.props.torrents_store.queueMoveUp(this.props.view_store.selectedTorrents);
  }

  @autobind queueMoveDown() {
    this.props.torrents_store.queueMoveDown(this.props.view_store.selectedTorrents);
  }

  @autobind queueMoveBottom() {
    this.props.torrents_store.queueMoveBottom(this.props.view_store.selectedTorrents);
  }

  render () {
    return (
      <IconMenu icon='swap_vert' position='auto' menuRipple styleName='rightOptions'>
        <MenuItem caption='Move to Top' onClick={this.queueMoveTop} />
        <MenuItem caption='Move Up' onClick={this.queueMoveUp} />
        <MenuItem caption='Move Down' onClick={this.queueMoveDown} />
        <MenuItem caption='Move to Bottom' onClick={this.queueMoveBottom} />
      </IconMenu>
    );
  }
}
