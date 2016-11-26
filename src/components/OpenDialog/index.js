import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { observable, action } from 'mobx';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import Dialog from '../Dialog'
import logoImage from '../../images/logo.png';

import TorrentUpload from 'stores/torrent-upload';

import styles from './styles/index.css';

@inject('view_store', 'torrents_store')
@observer
@CSSModules(styles)
class OpenDialog extends Component {
  constructor(props) {
    super(props);

    this.torrentUpload = new TorrentUpload();
  }

  @autobind onUpload(event) {
    event.preventDefault();
    this.torrentUpload.forEach((torrentUploadData) =>
      this.props.torrents_store.add(torrentUploadData));
    this.props.view_store.toggleOpenDialog();
  }

  @autobind onCancel(event) {
    event.preventDefault();
    this.props.view_store.toggleOpenDialog();
  }

  @autobind onHide() {
    this.props.view_store.toggleOpenDialog();
  }

  @autobind onChange({ target }) {
    const value = {
      file: 'files',
      checkbox: 'checked',
    }[target.type] || 'value';

    this.torrentUpload.setData({[target.name]: target[value]});
  }

  render() {
    return (
      <Dialog
        show={this.props.view_store.isOpenDialogShown}
        onHide={this.onHide}
      >
        <div styleName='body'>
          <div styleName='logo'>
            <img src={logoImage} alt='logo'></img>
          </div>
          <div styleName='form'>
            <h2>Upload Torrent Files</h2>
            <form onChange={this.onChange}>
              <section>
                <fieldset>
                  <label>Please select a torrent file to upload:</label>
                  <input name="files" type="file" multiple="multiple" />
                </fieldset>

                <fieldset>
                  <label>Or enter a URL:</label>
                  <input name="filename" type="url" />
                </fieldset>

                <fieldset>
                  <label>Destination folder <i>(0 GB Free)</i>:</label>
                  <input name="download-dir" type="text" />
                </fieldset>

                <fieldset>
                <label styleName='inlineCheck'>
                  <input name="paused" type="checkbox" defaultChecked={true} />
                  <div>Start when added</div>
                </label>
                </fieldset>
              </section>
              <section styleName='buttons'>
                <button onClick={this.onCancel}>Cancel</button>
                <button onClick={this.onUpload}>Upload</button>
              </section>
            </form>
          </div>
        </div>

      </Dialog>
    );
  }
}

export default OpenDialog;
