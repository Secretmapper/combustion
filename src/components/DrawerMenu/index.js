import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject } from 'mobx-react';
import autobind from 'autobind-decorator';

import Input from 'react-toolbox/lib/input';
import Dropdown from 'react-toolbox/lib/dropdown';
import { List, ListItem, ListSubHeader, ListDivider } from 'react-toolbox/lib/list';
import SettingsIcon from 'react-icons/lib/md/settings';
import FilterToolbar from 'components/toolbars/FilterToolbar';
import { sortCriteria } from 'stores/torrent-store';

import styles from './styles/index.css';

@inject('view_store', 'torrents_store', 'prefs_store')
@CSSModules(styles)
class DrawerMenu extends Component {
  @autobind deselectAllTorrents() {
    this.props.view_store.selectTorrents([]);
  }

  @autobind onChange(value) {
    this.props.prefs_store.setSortCriteria(value);
  }

  @autobind onChangeSearch(search) {
    this.deselectAllTorrents();
    this.props.torrents_store.setTextFilter(search);
  }

  @autobind onTogglePreferences() {
    this.props.view_store.togglePreferencesDialog();
  }

  @autobind onChangeFilterTracker(value) {
    this.deselectAllTorrents();
    this.props.torrents_store.setTrackerFilter(value);
  }


  render() {
    const search = this.props.torrents_store.textFilter;
    const currCriteria = this.props.prefs_store.sortCriteria;

    const tracker = this.props.torrents_store.trackerFilter;
    const trackers = this.props.torrents_store.trackers.map((domain) => {
      const label = domain.replace(/\b\w/g, l => l.toUpperCase()); // Capitalize

      return {value: domain, label};
    });

    return (
      <aside styleName='drawer'>
        <List styleName='aside' selectable ripple>
          <Input
            type='text'
            label='Search'
            name='search'
            styleName='list_item'
            value={search}
            onChange={this.onChangeSearch}
          />
          <Dropdown
            auto
            label='SORT BY'
            source={sortCriteria}
            value={currCriteria}
            onChange={this.onChange}
            theme={{ inputInput: styles.list_item }}
          />
          <ListSubHeader caption='Filter by Status' />
          <FilterToolbar />
          <Dropdown
            auto
            label='Filter by Tracker'
            source={[{value: '', label: 'All'}, ...trackers]}
            value={tracker}
            onChange={this.onChangeFilterTracker}
            theme={{ inputInput: styles.list_item }}
          />
          <ListDivider />
          <ListItem caption='Settings' leftIcon={<SettingsIcon />} onClick={this.onTogglePreferences} />
        </List>
        <footer styleName='footer'>
          <span>Combustion © 2017</span>
          <span>by <a href='https://arianv.com/'>Secretmapper</a></span>
        </footer>
      </aside>
    )
  }
}

export default DrawerMenu;
