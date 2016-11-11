import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';

import Dialog from '../Dialog'
import logoImage from '../../images/logo.png';

import styles from './styles/index.css';

@inject('view_store')
@observer
@CSSModules(styles)
class OpenDialog extends Component {
  constructor(props) {
    super(props);

    this.onHide = this.onHide.bind(this);
  }

  onHide() {
    this.props.view_store.toggleOpenDialog();
  }

  render() {
    return (
      <Dialog
        show={this.props.view_store.isOpenDialogShown}
        onHide={this.onHide}
      >
        <img src={logoImage} alt='logo'></img>
        <h2>Upload Torrent Files</h2>
        <form action="#" method="post" id="torrent_upload_form" encType="multipart/form-data" target="torrent_upload_frame">
          <div title="dialog_message">
            <label htmlFor="torrent_upload_file">Please select a torrent file to upload:</label>
              <input type="file" name="torrent_files[]" id="torrent_upload_file" multiple="multiple" value="" />
            <label htmlFor="torrent_upload_url">Or enter a URL:</label>
              <input type="url" id="torrent_upload_url" value="" />
            <label id="add-dialog-folder-label" htmlFor="add-dialog-folder-input">Destination folder  <i>(86.2 GB Free)</i>:</label>
              <input type="text" id="add-dialog-folder-input" value="/home/edu/Downloads" />
              <input type="checkbox" id="torrent_auto_start" checked="checked" />
            <label htmlFor="torrent_auto_start" id="auto_start_label">Start when added</label>
          </div>
          <button>Upload</button>
          <button>Cancel</button>
        </form>
      </Dialog>
    );
  }
}

export default OpenDialog;
