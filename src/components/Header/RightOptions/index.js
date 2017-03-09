import React  from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles/index.css';

import { IconButton } from 'react-toolbox/lib/button';
import { Menu, MenuItem } from 'react-toolbox/lib/menu';
import RightIcon from 'react-icons/lib/md/chevron-right';
import MoreIcon from 'react-icons/lib/md/more-vert';

import FilterToolbar from 'components/toolbars/FilterToolbar';
import SortByContextMenu from 'components/menus/SortByContextMenu';

@CSSModules(styles)
export default class RightOptions extends React.Component {
  state = { isActive: false, isFilter: false, isSort: false };

  onActive = () => this.setState({ isActive: true })
  onSort = () => this.setState({ isSort: true })
  onFilter = () => this.setState({ isFilter: true })

  onHide = () => this.setState({ isActive: false })
  onHideSort = () => this.setState({ isSort: false })
  onHideFilter = () => this.setState({ isFilter: false })

  render () {
    return (
      <div style={{ display: 'inline-block', position: 'relative' }}>
        <IconButton title='Open Options' onClick={this.onActive}>
          <MoreIcon styleName='rightOptions' />
        </IconButton>
        <Menu position='auto' active={this.state.isActive} onHide={this.onHide}>
          <MenuItem onClick={this.onFilter}>
            Filter
            <RightIcon className={styles.rightIcon} />
          </MenuItem>
          <MenuItem onClick={this.onSort}>
            Sort
            <RightIcon className={styles.rightIcon} />
          </MenuItem>
        </Menu>
        <Menu position='auto' active={this.state.isFilter} onHide={this.onHideFilter}>
          <FilterToolbar onAnySelected={this.onHideFilter} />
        </Menu>
        <SortByContextMenu position='auto' active={this.state.isSort} onHide={this.onHideSort} />
      </div>
    );
  }
}
