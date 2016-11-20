import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import Dialog from '../Dialog'

import styles from './styles/index.css';

@inject('view_store', 'stats_store')
@observer
@CSSModules(styles)
class StatisticsDialog extends Component {

  @autobind onHide() {
    this.props.view_store.toggleStatisticsDialog();
  }

  render() {
    const cumulative = this.props.stats_store;

    return (
      <Dialog
        show={this.props.view_store.isStatisticsDialogShown}
        onHide={this.onHide}
      >
        <div styleName='body'>
          <h2>Statistics</h2>

          <div styleName='content'>
            <h3>Current Session</h3>
            <div styleName='row'>
              <div styleName='key'>Uploaded:</div>
              <div styleName='value'>9129.kb</div>
            </div>
            <div styleName='row'>
              <div styleName='key'>Downloaded:</div>
              <div styleName='value'>9129.kb</div>
            </div>
            <div styleName='row'>
              <div styleName='key'>Ratio:</div>
              <div styleName='value'>9129.kb</div>
            </div>
            <div styleName='row'>
              <div styleName='key'>Running Time:</div>
              <div styleName='value'>9129.kb</div>
            </div>

            <h3>Total</h3>
            <div styleName='row'>
              <div styleName='key'>Started:</div>
              <div styleName='value'>{cumulative.sessionCount}</div>
            </div>
            <div styleName='row'>
              <div styleName='key'>Uploaded:</div>
              <div styleName='value'>9129.kb</div>
            </div>
            <div styleName='row'>
              <div styleName='key'>Downloaded:</div>
              <div styleName='value'>9129.kb</div>
            </div>
            <div styleName='row'>
              <div styleName='key'>Ratio:</div>
              <div styleName='value'>9129.kb</div>
            </div>
            <div styleName='row'>
              <div styleName='key'>Running Time:</div>
              <div styleName='value'>9129.kb</div>
            </div>

          </div>

        </div>

      </Dialog>
    );
  }
}

export default StatisticsDialog;
