import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import Dialog from '../Dialog'
import logoImage from '../../images/logo.png';

import styles from './styles/index.css';

@inject('view_store', 'session_store')
@observer
@CSSModules(styles)
class AboutDialog extends Component {

  @autobind onHide() {
    this.props.view_store.toggleAboutDialog();
  }

  render() {
    return (
      <Dialog
        show={this.props.view_store.isAboutDialogShown}
        onHide={this.onHide}
        header='About'
      >
        <div styleName='body'>
          <div styleName='content'>
            <div styleName='logo'>
              <img src={logoImage} alt='logo'></img>
            </div>

            <h3>Transmission {this.props.session_store.settings.version}</h3>
            <p>A fast and easy BitTorrent client</p>
            <p>Copyright (c) The Transmission Project</p>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default AboutDialog;
