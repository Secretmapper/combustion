import React, { Component} from 'react';
import { Modal } from 'react-overlays';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';

import styles from './styles';

@inject('view_store')
@observer
@CSSModules(styles)
class Dialog extends Component {
  render() {
    // TODO; try to investigate how to move this to css module
    const backdropStyle = {
      position: 'fixed',
      top: 0, bottom: 0, left: 0, right: 0,
      zIndex: 'auto',
      backgroundColor: '#000',
      opacity: 0.2
    };

    return (
      <Modal
        className={styles.modalStyle}
        backdropStyle={backdropStyle}
        show={this.props.show}
        onHide={this.props.onHide}
      >
        <div className={styles.dialogStyle}>
          {this.props.children}
        </div>
      </Modal>
    );
  }
}

export default Dialog;
