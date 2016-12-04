import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import { size, timeInterval } from 'util/formatters';

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

    if (!this.props.view_store.isStatisticsDialogShown) {
      return false;
    }

    const cumulativeSession = this.props.stats_store.currentStats;
    const cumulativeTotal = this.props.stats_store.cumulativeStats;

    return (
      <Dialog
        show={this.props.view_store.isStatisticsDialogShown}
        onHide={this.onHide}
        header='Statistics'
      >
        <div styleName='body'>
          <h3>Current Session</h3>
          <div styleName='row'>
            <div styleName='key'>Uploaded:</div>
            <div styleName='value'>{ size(cumulativeSession.uploadedBytes) }</div>
          </div>
          <div styleName='row'>
            <div styleName='key'>Downloaded:</div>
            <div styleName='value'>{ size(cumulativeSession.downloadedBytes) }</div>
          </div>
          <div styleName='row'>
            <div styleName='key'>Ratio:</div>
            <div styleName='value'>None</div>
          </div>
          <div styleName='row'>
            <div styleName='key'>Running Time:</div>
            <div styleName='value'>{ timeInterval(cumulativeSession.secondsActive) } seconds</div>
          </div>

          <h3>Total</h3>
          <div styleName='row'>
            <div styleName='key'>Started:</div>
            <div styleName='value'>{ cumulativeTotal.sessionCount } times</div>
          </div>
          <div styleName='row'>
            <div styleName='key'>Uploaded:</div>
            <div styleName='value'>{ size(cumulativeTotal.uploadedBytes) }</div>
          </div>
          <div styleName='row'>
            <div styleName='key'>Downloaded:</div>
            <div styleName='value'>{ size(cumulativeTotal.downloadedBytes) }</div>
          </div>
          <div styleName='row'>
            <div styleName='key'>Ratio:</div>
            <div styleName='value'>None</div>
          </div>
          <div styleName='row'>
            <div styleName='key'>Running Time:</div>
            <div styleName='value'>{ timeInterval(cumulativeTotal.secondsActive) } seconds</div>
          </div>
        </div>

      </Dialog>
    );
  }
}

export default StatisticsDialog;
