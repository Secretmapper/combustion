import React, { Component} from 'react';
import Dropzone from 'react-dropzone';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import logoImage from '../../images/logo.png';

import TorrentUpload from 'stores/torrent-upload';

import styles from './styles/index.css';

@inject('view_store', 'torrents_store', 'session_store')
@observer
@CSSModules(styles)
class DropzonePanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.torrentUpload = new TorrentUpload();
    this.torrentUpload.setDownloadDir(this.props.session_store.settings['download-dir']);

    document.addEventListener('dragenter', () => {
      this.setState({ visible: true });
    }, false);

    document.addEventListener('dragend', () => {
      this.setState({ visible: false });
    }, false);
  }

  @autobind onDrop (acceptedFiles, rejectedFiles) {
    this.setState({
      visible: false,
    });

    this.torrentUpload.setTorrentFiles(acceptedFiles);
    this.torrentUpload.serialize().then((torrents) => {
      torrents.forEach((torrentData) => this.props.torrents_store.add(torrentData));
    });
  }

  render() {
    if (!this.state.visible) {
      return null;
    }

    return (
      <div>
        <Dropzone className={styles.container} disableClick={true} accept='application/x-bittorrent' onDrop={this.onDrop}>

          <div styleName='content'>
            <img src={logoImage} alt='logo'></img>
            <div styleName='description'>Try dropping some torrent files here.</div>
          </div>

        </Dropzone>
      </div>
    );
  }
};

export default DropzonePanel;
