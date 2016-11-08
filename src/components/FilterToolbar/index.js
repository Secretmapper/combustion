import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';

import arrowUpImage from '../../images/arrow-up.png';
import arrowDownImage from '../../images/arrow-down.png';

import styles from './styles';

@CSSModules(styles)
class FilterToolbar extends Component {
  render() {
    const torrentCount = this.props.stats_store.stats.torrentCount;
    const downloadSpeed = this.props.stats_store.stats.downloadSpeed;
    const uploadSpeed = this.props.stats_store.stats.uploadSpeed;

    return (
      <div styleName='toolbar'>
        <span>Show</span>

        <select>
          <option>All</option>
          <option>Active</option>
          <option>Downloading</option>
          <option>Seeding</option>
          <option>Paused</option>
          <option>Finished</option>
        </select>
        <select>
          <option>All</option>
          <option>Foo</option>
          <option>Bar</option>
        </select>
        <input styleName='filter'  type='search' placeholder='Filter'/>
        <span>{torrentCount} Transfers</span>

        <span>
          <img src={arrowDownImage} alt='Download speed' title='Download speed'/>
          {downloadSpeed} Kb/s
        </span>
        <span>
          <img src={arrowUpImage} alt='Upload speed' title='Upload speed'/>
          {uploadSpeed} Kb/s
        </span>
      </div>
    );
  }
}

export default inject('view_store', 'stats_store')(observer(FilterToolbar));
