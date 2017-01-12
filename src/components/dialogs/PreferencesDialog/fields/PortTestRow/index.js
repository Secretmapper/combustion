import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';

import styles from './styles/index.css';

@inject('session_store')
@observer
@CSSModules(styles)
class PortTestRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: null,
    };
  }

  componentDidMount() {
    const port = this.props.session_store.settings['peer-port'];

    this.props.session_store.testPort(port).then((open) => {
      this.setState({
        open: open
      });
    });
  }

  renderPortStatus() {
    if (this.state.open === null) {
      return (
        <span id="port-label">Status: Unknown</span>
      );
    } else if (this.state.open) {
      return (
        <span id="port-label">Port is <strong>Open</strong></span>
      );
    } else {
      return (
        <span id="port-label">Port is <strong>Closed</strong></span>
      );
    }
  }

  render() {
    return (
      <div styleName='row'>
        <div styleName='key'>&nbsp;</div>
        <div styleName='value'>
          {this.renderPortStatus()}
        </div>
      </div>
    );
  }
}

export default PortTestRow;
