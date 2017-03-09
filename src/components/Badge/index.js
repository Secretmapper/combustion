import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles/index.css'

@CSSModules(styles)
export default class Badge extends Component {
  render () {
    return (
      <div styleName='badge'>{this.props.children}</div>
    )
  }
}
