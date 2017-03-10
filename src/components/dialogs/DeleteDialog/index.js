import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import Dialog from 'react-toolbox/lib/dialog'

import styles from './styles/index.css';

@inject('view_store', 'torrents_store')
@observer
@CSSModules(styles)
class DeleteDialog extends Component {
  @autobind onDeleteWithData() {
    this.props.view_store.toggleDeleteDialog();

    this.props.torrents_store.remove(this.props.view_store.selectedTorrents, {
      'delete-local-data': true
    });
  }

  @autobind onDelete() {
    this.props.view_store.toggleDeleteDialog();

    this.props.torrents_store.remove(this.props.view_store.selectedTorrents);
  }

  @autobind onHide() {
    this.props.view_store.toggleDeleteDialog();
  }

  render() {
    const actions = [
      { label: 'Cancel', onClick: this.onHide },
      { label: 'Delete w/ Data', onClick: this.onDeleteWithData, accent: true },
      { label: 'Delete', onClick: this.onDelete, primary: true, raised: true }
    ]

    return (
      <Dialog
        actions={actions}
        active={this.props.view_store.isDeleteDialogShown}
        onEscKeyDown={this.onHide}
        onOverlayClick={this.onHide}
        title='Delete Torrent'
      >
        <div styleName='body'>
          Once removed, continuing the transfer will require the torrent file. Are you sure you want to remove it?
        </div>

      </Dialog>
    );
  }
}

export default DeleteDialog;
