import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import Switch from 'react-toolbox/lib/switch';
import autobind from 'autobind-decorator';

import Input from 'react-toolbox/lib/input';

import styles from './styles/index.css';

@inject('session_store')
@observer
@CSSModules(styles)
class CheckValueRow extends Component {
  state = {
    check: this.props.session_store.settings[this.props.idCheck],
    value: this.props.session_store.settings[this.props.idValue]
  }

  @autobind onSwitchChange () {
    this.setState({ check: !this.state.check })
  }

  @autobind onValueChange (value) {
    this.setState({ value })
  }

  render() {
    const { type = 'number' } = this.props

    return (
      <div className={cx(styles.row, { [styles.rowHalf]: this.props.half })}>
        <div styleName='key'>
          <Switch
            id={this.props.idCheck}
            className={styles.mswitch}
            checked={this.state.check}
            onChange={this.onSwitchChange}
          />
        </div>
        <div styleName='value'>
          <Input
            type={type}
            min='0'
            className={styles.minput}
            label={this.props.label}
            id={this.props.idValue}
            value={this.state.value}
            onChange={this.onValueChange}
            disabled={!this.state.check}
          />
        </div>
      </div>
    );
  }
}

export default CheckValueRow;
