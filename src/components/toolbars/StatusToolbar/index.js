import React, { Component} from 'react';
import { findDOMNode } from 'react-dom'
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import settingsImage from 'images/settings.png';
import preferencesImage from 'images/wrench.png';
import compactImage from 'images/compact.png';

import SettingsContextMenu from 'components/menus/SettingsContextMenu';

import styles from './styles/index.css';

@inject('prefs_store', 'view_store', 'session_store')
@observer
@CSSModules(styles)
class StatusToolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: {
        left: 0,
        top: 0,
      },
    };
  }

  @autobind onTogglePreferences() {
    this.props.view_store.togglePreferencesDialog();
  }

  @autobind onToggleCompact() {
    this.props.prefs_store.toggleCompact();
  }

  @autobind onToggleTurtle() {
    this.props.session_store.togglePreference('alt-speed-enabled');
  }

  @autobind onToggleSettings(event) {
    const { clientX, clientY } = event;

    event.preventDefault();
    event.stopPropagation();

    this.toggleContextMenu({left: clientX, top: clientY});
  }

  @autobind toggleContextMenu(position) {
    this.props.view_store.toggleSettingsContextMenu();
    this.setState({position});
  }

  @autobind renderContextMenu() {
    const { position } = this.state;

    return (
      <div ref='target' style={{position: 'absolute', visibility: 'hidden', ...position, left: position.left + 50}}>
        <SettingsContextMenu
          show={this.props.view_store.isSettingsContextMenuShown}
          container={this}
          target={() => findDOMNode(this.refs.target)}
          onHide={() => this.props.view_store.toggleSettingsContextMenu()}
        />
      </div>
    );
  }

  render() {
    let compactClassName = styles.button;
    let turtleClassName = styles.buttonTurtle;

    if (this.props.prefs_store.compact) {
      compactClassName += ` ${styles.buttonActive}`;
    }

    if (this.props.session_store.settings['alt-speed-enabled']) {
      turtleClassName += ` ${styles.turtleActive}`;
    }

    return (
      <div styleName='toolbar'>
        <button styleName='button' onClick={this.onToggleSettings}>
          <img src={settingsImage} alt='Settings'/>
        </button>
        <button styleName='button' onClick={this.onTogglePreferences}>
          <img src={preferencesImage} alt='Preferences'/>
        </button>
        <button className={turtleClassName} onClick={this.onToggleTurtle} title='Speed limit'></button>
        <button className={compactClassName} onClick={this.onToggleCompact}>
          <img src={compactImage} alt='Compact view'/>
        </button>
        {this.renderContextMenu()}
      </div>
    );
  }
}

export default StatusToolbar;
