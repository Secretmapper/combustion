import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject } from 'mobx-react';
import cx from 'classnames';
import autobind from 'autobind-decorator';

import styles from './styles/index.css';

import RightOptions from './RightOptions';
import NavIcon from 'react-icons/lib/md/menu';
import NavBack from 'react-icons/lib/md/arrow-back';
import { IconButton } from 'react-toolbox/lib/button';

import StatsToolbar from 'components/toolbars/StatsToolbar';
import ActionToolbar from 'components/toolbars/ActionToolbar';

@inject('view_store', 'torrents_store')
@CSSModules(styles)
class Header extends Component {
  @autobind onSelectBack() {
    this.deselectAllTorrents()
  }

  @autobind deselectAllTorrents() {
    this.props.view_store.selectTorrents([]);
  }

  render() {
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
            <RightOptions />
          </div>
        </div>
      </header>
    )
  }
}

export default Header;
