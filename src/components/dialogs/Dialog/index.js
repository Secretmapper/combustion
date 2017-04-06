import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import Button from 'react-toolbox/lib/button';

import MDialog from 'react-toolbox/lib/dialog';

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
        title={
          <div>
            <Button
              icon='chevron_left'
              label=' '
              theme={{
                button: styles.button
              }}
              onClick={this.props.onHide}
            />
            {this.props.header}
          </div>
        }
        type='fullscreen'
      >
        {this.props.children}
      </MDialog>
    );
  }
}

export default Dialog;
