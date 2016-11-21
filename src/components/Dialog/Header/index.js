import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';

import styles from './styles/index.css';

@inject('view_store')
@observer
@CSSModules(styles)
class Header extends Component {
  render() {
    return (
      <header styleName='header'>
        <h2 styleName='title'>{ this.props.title }</h2>
        <button styleName='close' onClick={this.props.onClose} title='Close'> X </button>
      </header>
    );
  }
}

export default Header;
