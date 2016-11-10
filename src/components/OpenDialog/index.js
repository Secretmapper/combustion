import React, { Component} from 'react';
import { Modal } from 'react-overlays';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';

import logoImage from '../../images/logo.png';

import styles from './styles';

@inject('view_store')
@observer
@CSSModules(styles)
class OpenDialog extends Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.props.view_store.toggleOpenDialog();
  }

  render() {
    const modalStyle = {
      position: 'fixed',
      zIndex: 1040,
      top: 0, bottom: 0, left: 0, right: 0
    };

    const backdropStyle = {
      ...modalStyle,
      zIndex: 'auto',
      backgroundColor: '#000',
      opacity: 0.2
    };

    const dialogStyle = {
      position: 'absolute',
      width: 400,
      top: '50%', left: '50%',
      transform: `translate(-50%, -50%)`,
      border: '1px solid #e5e5e5',
      backgroundColor: 'white',
      boxShadow: '0 5px 15px rgba(0,0,0,.5)',
      padding: 20
    };

    return (
      <Modal
        style={modalStyle}
        backdropStyle={backdropStyle}
        show={this.props.view_store.isOpenDialogShown}
        onHide={this.onClose}
      >
        <div style={dialogStyle}>
  				<img src={logoImage} alt='logo'></img>
  				<h2>Upload Torrent Files</h2>
  				<form action="#" method="post" id="torrent_upload_form" enctype="multipart/form-data" target="torrent_upload_frame">
  					<div class="dialog_message">
  						<label for="torrent_upload_file">Please select a torrent file to upload:</label>
  							<input type="file" name="torrent_files[]" id="torrent_upload_file" multiple="multiple" value="" />
  						<label for="torrent_upload_url">Or enter a URL:</label>
  							<input type="url" id="torrent_upload_url" value="" />
  						<label id="add-dialog-folder-label" for="add-dialog-folder-input">Destination folder  <i>(86.2 GB Free)</i>:</label>
  							<input type="text" id="add-dialog-folder-input" value="/home/edu/Downloads" />
  							<input type="checkbox" id="torrent_auto_start" checked="checked" />
  						<label for="torrent_auto_start" id="auto_start_label">Start when added</label>
  					</div>
  					<button>Upload</button>
  					<button>Cancel</button>
  				</form>
        </div>
      </Modal>
    );
  }
}

export default OpenDialog;
