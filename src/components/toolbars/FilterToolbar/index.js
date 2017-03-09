import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import Badge from 'components/Badge';

import { MenuItem } from 'react-toolbox/lib/menu';

import styles from './styles/index.css';

@inject('prefs_store', 'view_store', 'stats_store', 'torrents_store')
@observer
@CSSModules(styles)
class FilterToolbar extends Component {
  @autobind deselectAllTorrents() {
    this.props.view_store.selectTorrents([]);
  }

  onClickFilterState = value => _ => {
    this.deselectAllTorrents();
    this.props.torrents_store.setStatusFilter(+value);

    if (this.props.onAnySelected) {
      this.props.onAnySelected()
    }
  }

  render() {
    const states = this.props.torrents_store.statesWithCount;
    const status = this.props.torrents_store.statusFilter;

    return (
      <div>
        {states.map((state, index) =>
          <MenuItem
            key={state.value}
            value={state.value}
            caption={state.label}
            theme={{ caption:
                      (+state.value === status)
                        ? styles.menuSelected
                        : undefined
            }}
            onClick={this.onClickFilterState(state.value)}
          >
            <Badge>{state.count}</Badge>
          </MenuItem>
        )}
      </div>
    );
  }
}

export default FilterToolbar;
