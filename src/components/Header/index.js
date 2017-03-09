import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject } from 'mobx-react';
import cx from 'classnames'
import autobind from 'autobind-decorator';

import styles from './styles/index.css';

import RightOptions from './RightOptions';
import NavIcon from 'react-icons/lib/md/menu';
import { Card } from 'react-toolbox/lib/card';
import Input from 'react-toolbox/lib/input';
import { IconButton } from 'react-toolbox/lib/button';

import SearchIcon from 'react-icons/lib/md/search';
import ClearIcon from 'react-icons/lib/md/clear';

import StatsToolbar from 'components/toolbars/StatsToolbar';
import ActionToolbar from 'components/toolbars/ActionToolbar';

@inject('view_store', 'torrents_store')
@CSSModules(styles)
class Header extends Component {
  state = {
    showSearch: false
  }

  @autobind onShowSearch() {
    this.setState({ showSearch: true })
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

    return (
      <header styleName='header'>
        <div styleName='header__inner'>
          <div styleName='header__inner_top'>
            <IconButton onClick={this.props.onToggleDrawer}>
              <NavIcon style={{color: 'white'}} />
            </IconButton>
            <IconButton style={{visibility: 'hidden'}}><NavIcon/></IconButton>
            <div styleName='headerName'>
              <ActionToolbar />
            </div>
            <IconButton onClick={this.onShowSearch}>
              <SearchIcon style={{color: 'white'}} />
            </IconButton>
            <RightOptions />
          </div>
          <div styleName='header__inner_bottom'>
            <StatsToolbar />
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
