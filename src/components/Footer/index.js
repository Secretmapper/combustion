import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';
import cx from 'classnames';

import Input from 'react-toolbox/lib/input';
import { Card } from 'react-toolbox/lib/card';
import { IconButton } from 'react-toolbox/lib/button';

import ClearIcon from 'react-icons/lib/md/clear';
import CompactListIcon from 'react-icons/lib/md/list'
import ListIcon from 'react-icons/lib/md/view-list'
import FastIcon from 'react-icons/lib/md/signal-cellular-4-bar'
import SlowIcon from 'react-icons/lib/md/signal-cellular-connected-no-internet-4-bar'

import SearchIcon from 'react-icons/lib/md/search';

import styles from './styles/index.css';

@inject('prefs_store', 'view_store', 'session_store', 'torrents_store')
@observer
@CSSModules(styles)
class Footer extends Component {
  state = {
    position: {
      left: 0,
      top: 0,
    },
    showSearch: false
  };

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

  @autobind onToggleSearch() {
    this.setState({ showSearch: !this.state.showSearch })
  }

  @autobind onCloseSearch() {
    this.props.torrents_store.setTextFilter('');
    this.setState({ showSearch: false })
  }

  @autobind onChangeSearch(search) {
    this.props.view_store.selectTorrents([]);
    this.props.torrents_store.setTextFilter(search);
  }

  render() {
    const { torrents_store, prefs_store, session_store } = this.props
    const { compact } = prefs_store
    const turtle = session_store.settings['alt-speed-enabled'] 

    const search = torrents_store.textFilter;
    const showSearch = this.state.showSearch || !!search;

    return (
      <div styleName='footer'>
        <Card className={cx(styles.header__search, {[styles['header__search--show']]: showSearch})}>
          <Input
            type='text'
            hint='Search'
            name='search'
            value={search}
            onChange={this.onChangeSearch}
            icon={<SearchIcon />}
            theme={{
              input: styles.header__search__input,
              inputElement: styles.header__search__input_element,
              bar: styles.header__search__input_bar,
              hint: styles.header__search__input_hint,
              icon: styles.header__search__input_icon
            }}
          />
          <IconButton onClick={this.onCloseSearch} styleName='header__search_cross'>
            <ClearIcon />
          </IconButton>
        </Card>
        <div styleName='toolbar'>
          <div styleName='button' onClick={this.onToggleTurtle}>
            {turtle
              ? <SlowIcon />
              : <FastIcon />
            }
          </div>
          <div styleName='button' onClick={this.onToggleCompact}>
            {compact
              ? <CompactListIcon />
              : <ListIcon />
            }
          </div>
          <div styleName='button' onClick={this.onToggleSearch}>
            <SearchIcon />
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
