import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import Dialog from '../Dialog'

import styles from './styles/index.css';

@inject('view_store')
@observer
@CSSModules(styles)
class StatisticsDialog extends Component {

  @autobind onHide() {
    this.props.view_store.toggleStatisticsDialog();
  }

  render() {
    return (
      <Dialog
        show={this.props.view_store.isStatisticsDialogShown}
        onHide={this.onHide}
      >
        <div styleName='body'>
          <h2>Statistics</h2>
        </div>

      </Dialog>
    );
  }
}

export default StatisticsDialog;
