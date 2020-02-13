import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import Button from 'react-toolbox/lib/button';

import Left from 'react-icons/lib/md/chevron-left';
import MDialog from 'react-toolbox/lib/dialog';

import styles from './styles/index.css';
import theme from './styles/theme.css'

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
              icon={<Left style={{ lineHeight: 36, verticalAlign: 'baseline' }} />}
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
        theme={theme}
      >
        {this.props.children}
      </MDialog>
    );
  }
}

export default Dialog;
