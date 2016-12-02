import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';

import styles from './styles/index.css';

@inject('session_store')
@observer
@CSSModules(styles)
class CheckRow extends Component {
  render() {
    const check = this.props.session_store.settings[this.props.id];

    return (
      <div styleName='row'>
        <input type='checkbox' id={this.props.id} title={this.props.tilte} defaultChecked={check}/>
        <label htmlFor={this.props.id} title={this.props.tilte}>{this.props.label}</label>
      </div>
    );
  }
}

export default CheckRow;
