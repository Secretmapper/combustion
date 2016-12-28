import React, { Component} from 'react';
import Dropzone from 'react-dropzone';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import logoImage from '../../images/logo.png';

import TorrentUpload from 'stores/torrent-upload';

import styles from './styles/index.css';

@inject('torrents_store', 'session_store')
@observer
@CSSModules(styles)
class DropzoneLayer extends Component {
  constructor(props) {
    super(props);

    this.torrentUpload = new TorrentUpload();
    this.torrentUpload.setDownloadDir(this.props.session_store.settings['download-dir']);
  }

  @autobind onDrop(acceptedFiles, rejectedFiles) {
    this.torrentUpload.setTorrentFiles(acceptedFiles);
    this.torrentUpload.serialize().then((torrents) => {
      torrents.forEach((torrentData) => this.props.torrents_store.add(torrentData));
    });
  }

  render() {
    return (
      <Dropzone
        activeClassName={styles.activeContainer}
        className={styles.container}
        disableClick={true}
        accept='application/x-bittorrent'
        onDrop={this.onDrop}
      >
        <div styleName='dropzoneContainer'>
          <div styleName='dropzoneContent'>
            <img src={logoImage} alt='logo' />
            <div styleName='description'>Try dropping some torrent files here.</div>
          </div>
        </div>
        <div styleName='childrenContainer'>
          {this.props.children}
        </div>
      </Dropzone>
    );
  }
};

export default DropzoneLayer;
