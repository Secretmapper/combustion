import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';

import styles from './styles/index.css';

@inject('session_store')
@observer
@CSSModules(styles)
class SelectRow extends Component {
  render() {
    const value = this.props.session_store.settings[this.props.id];

    const options = Object.keys(this.props.options).map((key) => {
      return {
        key: key,
        value: this.props.options[key],
      };
    });

    return (
      <div styleName='row'>
        <div styleName='key'>
          <label htmlFor={this.props.id}>{this.props.label}:</label>
        </div>
        <div styleName='value'>
          <select id={this.props.id} defaultValue={value}>
            {options.map((option) => (
              <option key={option.key} value={option.key}>{option.value}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default SelectRow;
