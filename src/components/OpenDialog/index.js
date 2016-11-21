import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import Dialog from '../Dialog'
import logoImage from '../../images/logo.png';

import styles from './styles/index.css';

@inject('view_store')
@observer
@CSSModules(styles)
class OpenDialog extends Component {
  @autobind onUpload(event) {
    event.preventDefault();
  }

  @autobind onCancel(event) {
    event.preventDefault();
    this.props.view_store.toggleOpenDialog();
  }

  @autobind onHide() {
    this.props.view_store.toggleOpenDialog();
  }

  render() {
    return (
      <Dialog
        show={this.props.view_store.isOpenDialogShown}
        onHide={this.onHide}
        header='Upload Torrent Files'
      >
        <div styleName='body'>
          <div styleName='logo'>
            <img src={logoImage} alt='logo'></img>
          </div>
          <div styleName='form'>
            <form>
              <section style={{display: 'flex', flexDirection: 'column'}}>
                <fieldset style={{flex: 1}}>
                  <label>Please select a torrent file to upload:</label>
                  <input type="file" multiple="multiple" />
                </fieldset>

                <fieldset style={{flex: 1}}>
                  <label>Or enter a URL:</label>
                  <input type="url" />
                </fieldset>


                <fieldset style={{flex: 1}}>
                  <label>Destination folder <i>(0 GB Free)</i>:</label>
                  <input type="text" />
                </fieldset>

                <fieldset style={{flex: 1}}>
                <label>
                  <input styleName='inline  ' type="checkbox" defaultChecked={true} />
                  Start when added
                </label>
                </fieldset>
              </section>
              <section>
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
