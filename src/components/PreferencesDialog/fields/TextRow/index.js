import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';

import styles from './styles/index.css';

@inject('session_store')
@observer
@CSSModules(styles)
class TextRow extends Component {
  render() {
    const value = this.props.session_store.settings[this.props.id];

    return (
      <div styleName='row'>
        <div styleName='key'>{this.props.label}:</div>
        <div styleName='value'>
          <input type='text' id={this.props.id} defaultValue={value}/>
        </div>
      </div>
    );
  }
}

export default TextRow;
