import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import settingsImage from '../../images/settings.png';
import preferencesImage from '../../images/wrench.png';
import turtleImage from '../../images/turtle.png';
import compactImage from '../../images/compact.png';

import styles from './styles/index.css';

@inject('view_store', 'session_store')
@observer
@CSSModules(styles)
class StatusToolbar extends Component {
  @autobind onToggleCompact() {
    this.props.view_store.toggleCompact();
  }

  render() {
    let compactClassName = styles.button;
    let turtleClassName = styles.button;

    if (this.props.view_store.compact) {
      compactClassName += ` ${styles.buttonActive}`;
    }

    if (this.props.session_store.altSpeedEnabled) {
      turtleClassName += ` ${styles.buttonActive}`;
    }

    return (
      <div styleName='toolbar'>
        <button styleName='button'>
          <img src={settingsImage} alt='Settings'/>
        </button>
        <button styleName='button'>
          <img src={preferencesImage} alt='Preferences'/>
        </button>
        <button className={turtleClassName}>
          <img src={turtleImage} alt='Speed limit'/>
        </button>
        <button className={compactClassName} onClick={this.onToggleCompact}>
          <img src={compactImage} alt='Compact view'/>
        </button>
      </div>
    );
  }
}

export default StatusToolbar;
