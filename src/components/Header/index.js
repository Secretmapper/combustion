import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject } from 'mobx-react';
import cx from 'classnames'
import autobind from 'autobind-decorator';

import styles from './styles/index.css';

import RightOptions from './RightOptions';
import NavIcon from 'react-icons/lib/md/menu';
import NavBack from 'react-icons/lib/md/arrow-back';
import { Card } from 'react-toolbox/lib/card';
import Input from 'react-toolbox/lib/input';
import { IconButton } from 'react-toolbox/lib/button';

import SearchIcon from 'react-icons/lib/md/search';
import ClearIcon from 'react-icons/lib/md/clear';

import StatsToolbar from 'components/toolbars/StatsToolbar';
import ActionToolbar from 'components/toolbars/ActionToolbar';

import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';

@inject('view_store', 'torrents_store')
@CSSModules(styles)
class Header extends Component {
  state = {
    showSearch: false
  }

  @autobind onShowSearch() {
    this.setState({ showSearch: true })
  }

  @autobind onSelectBack() {
    this.deselectAllTorrents()
  }

  @autobind onCloseSearch() {
    this.props.torrents_store.setTextFilter('');
    this.setState({ showSearch: false })
  }

  @autobind deselectAllTorrents() {
    this.props.view_store.selectTorrents([]);
  }

  @autobind onChangeSearch(search) {
    this.deselectAllTorrents();
    this.props.torrents_store.setTextFilter(search);
  }

  render() {
    const search = this.props.torrents_store.textFilter;
    const showSearch = this.state.showSearch || !!search;
    const accented = this.props.view_store.selectedTorrents.length > 0

    return (
      <header
        className={cx(styles.header, {
          [styles['header--accent']]: accented
        })}
      >
        <div styleName='header__inner'>
          <IconButton styleName='header__inner_sub' onClick={accented ? this.onSelectBack : this.props.onToggleDrawer}>
          {accented
            ? <NavBack style={{color: 'white'}} />
            : <NavIcon style={{color: 'white'}} />
          }
          </IconButton>
          <div styleName='header__inner_top'>
            <div styleName='headerName'>
              <ActionToolbar />
            </div>
            <div styleName='header__inner_bottom'>
              <StatsToolbar />
            </div>
          </div>
          <div styleName='header__inner_sub'>
            <IconButton onClick={this.onShowSearch}>
              <SearchIcon style={{color: 'white'}} />
            </IconButton>
            <RightOptions />
          </div>
        </div>
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
      </header>
    )
  }
}

export default Header;
