import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
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
    this.torrentUpload.serialize().then((torrents) => {
      torrents.forEach((torrentData) => this.props.torrents_store.add(torrentData));
    });
    this.props.view_store.toggleOpenDialog();
  }

  @autobind onCancel(event) {
    event.preventDefault();
    this.props.view_store.toggleOpenDialog();
  }

  @autobind onHide() {
    this.props.view_store.toggleOpenDialog();
  }

  @autobind onChangeFiles({ target }) {
    this.torrentUpload.setTorrentFiles(target.files);
  }

  @autobind onChangeUrl({ target }) {
    this.torrentUpload.setTorrentUrl(target.value);
  }

  @autobind onChangeDownloadDirectory({ target }) {
    this.torrentUpload.setDownloadDir(target.value);
  }

  @autobind onChangeStart({ target }) {
    this.torrentUpload.setPaused(!target.checked);
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
                  <input name="files" type="file" multiple="multiple" onChange={this.onChangeFiles} />
                </fieldset>

                <fieldset>
                  <label>Or enter a URL:</label>
                  <input name="filename" type="url" onChange={this.onChangeUrl} />
                </fieldset>

                <fieldset>
                  <label>Destination folder <i>(0 GB Free)</i>:</label>
                  <input name="download-dir" type="text" onChange={this.onChangeDownloadDirectory} />
                </fieldset>

                <fieldset>
                <label styleName='inlineCheck'>
                  <input name="paused" type="checkbox" defaultChecked={true} onChange={this.onChangeStart} />
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
