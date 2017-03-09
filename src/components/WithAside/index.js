import React, { Component} from 'react';
import cx from 'classnames'
import CSSModules from 'react-css-modules';
import { inject } from 'mobx-react';

import styles from './styles/index.css';

@inject('view_store', 'torrents_store')
@CSSModules(styles)
class WithAside extends Component {
  render() {
    return (
      <div styleName='container' className={this.props.className}>
        <div
          className={
            cx(styles.main, {[styles['main--aside']]: this.props.showAside})
          }
        >
          {this.props.children}
        </div>
        <aside
          className={
            cx(styles.aside, {[styles['aside--active']]: this.props.showAside})
          }
        >
          {this.props.aside}
        </aside>
      </div>
    )
  }
}

export default WithAside;
