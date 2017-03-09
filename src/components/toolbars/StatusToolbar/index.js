import React, { Component} from 'react';
import { findDOMNode } from 'react-dom'
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import CompactListIcon from 'react-icons/lib/md/list'
import ListIcon from 'react-icons/lib/md/view-list'
import FastIcon from 'react-icons/lib/md/signal-cellular-4-bar'
import SlowIcon from 'react-icons/lib/md/signal-cellular-connected-no-internet-4-bar'

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
    const { view_store, session_store } = this.props
    const { compact } = view_store
    const turtle = session_store.settings['alt-speed-enabled'] 

    return (
      <div styleName='toolbar'>
        {
          turtle
            ? <SlowIcon styleName='button' onClick={this.onToggleTurtle} />
            : <FastIcon styleName='button' onClick={this.onToggleTurtle} />
        }
        {
          compact
            ? <CompactListIcon styleName='button' onClick={this.onToggleCompact} />
            : <ListIcon styleName='button' onClick={this.onToggleCompact} />
        }
        {this.renderContextMenu()}
      </div>
    );
  }
}

export default StatusToolbar;
