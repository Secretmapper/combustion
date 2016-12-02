import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import styles from './styles/index.css';

@inject('session_store')
@observer
@CSSModules(styles)
class CheckValueRow extends Component {
  render() {
    const check = this.props.session_store.settings[this.props.idCheck];
    const value = this.props.session_store.settings[this.props.idValue];

    return (
      <div styleName='row'>
        <div styleName='key'>
          <input type="checkbox" id={this.props.idCheck} defaultChecked={check}/>
          <label htmlFor={this.props.idCheck}>{this.props.label}</label>
        </div>
        <div styleName='value'>
          <input type='number' min='0' id={this.props.idValue} defaultValue={value}/>
        </div>
      </div>
    );
  }
}

export default CheckValueRow;
