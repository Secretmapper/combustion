import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';

import MDialog from 'react-toolbox/lib/dialog'

import styles from './styles/index.css';

@inject('view_store')
@observer
@CSSModules(styles)
class Dialog extends Component {
  render() {
    return (
      <MDialog
        actions={this.props.actions}
        active={this.props.show}
        onEscKeyDown={this.props.onHide}
        onOverlayClick={this.props.onHide}
        title={this.props.header}
      >
        {this.props.children}
      </MDialog>
    );
  }
}

export default Dialog;
