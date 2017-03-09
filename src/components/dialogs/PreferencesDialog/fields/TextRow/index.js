import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import Input from 'react-toolbox/lib/input';
import styles from './styles/index.css';

@inject('session_store')
@observer
@CSSModules(styles)
class TextRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.session_store.settings[props.id]
    };
  }

  componentWillReceiveProps(nextProps) {
    const newValue = nextProps.session_store.settings[nextProps.id]
    if (newValue !== this.props.value) {
      this.setState({ value: newValue })
    }
  }

  @autobind setValue(newValue) {
    this.setState({ value: newValue })
  }

  render() {
    return (
      <div className={cx(styles.row, { [styles.rowHalf]: this.props.half })}>
        <Input
          label={this.props.label}
          id={this.props.id}
          type="text"
          onChange={this.setValue}
          value={this.state.value}
        />
      </div>
    );
  }
}

export default TextRow;
