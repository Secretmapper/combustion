import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import Switch from 'react-toolbox/lib/switch';
import autobind from 'autobind-decorator';

import styles from './styles/index.css';

@inject('session_store')
@observer
@CSSModules(styles)
class CheckRow extends Component {
  state = {
    checked: this.props.session_store.settings[this.props.id]
  }

  @autobind onSwitchChange() {
    this.setState({ checked: !this.state.checked })
  }

  render() {
    return (
      <div styleName='row'>
        <Switch
          label={this.props.label}
          id={this.props.id}
          title={this.props.title}
          checked={this.state.checked}
          onChange={this.onSwitchChange}
        />
      </div>
    );
  }
}

export default CheckRow;
