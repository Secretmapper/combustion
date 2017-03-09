import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import Dropdown from 'react-toolbox/lib/dropdown';

import styles from './styles/index.css';

@inject('session_store')
@observer
@CSSModules(styles)
class SelectRow extends Component {
  static contextTypes = {
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
  }

  state = {
    value: this.props.session_store.settings[this.props.id]
  }

  @autobind handleChange(value) {
    this.context.onBlur({
      target: {
        type: 'select',
        attributes: {
          id: { value: this.props.id }
        },
        value
      }
    });
    this.setState({ value });
  }

  render() {
    const options = Object.keys(this.props.options).map((key) => {
      return {
        value: key,
        label: this.props.options[key],
      };
    });

    return (
      <div className={cx(styles.row, { [styles.rowThird]: this.props.third })}>
        <Dropdown
          auto
          id={this.props.id}
          className={styles.mdropdown}
          label={this.props.label}
          source={options}
          value={`${this.state.value}`}
          onChange={this.handleChange}
          disabled={this.props.disabled}
        />
      </div>
    );
  }
}

export default SelectRow;
