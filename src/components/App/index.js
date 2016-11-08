import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import DevTools, { setLogEnabled } from 'mobx-react-devtools';
import { inject, observer } from 'mobx-react';

import Torrent from '../Torrent';
import ActionToolbar from '../ActionToolbar';
import FilterToolbar from '../FilterToolbar';
import StatusToolbar from '../StatusToolbar';

import styles from './styles';

function renderDevTools() {
  if (process.env.NODE_ENV !== 'development') return null;

  setLogEnabled(true);

  return <DevTools position={{top: 72, right: 20}} />;
}

/**
 * App component acts as the application layout.
 */
@CSSModules(styles)
class App extends Component {
  constructor(props) {
    super(props);

    this.renderTorrents = this.renderTorrents.bind(this);
  }

  componentDidMount() {
    this.props.torrents_store.getAll();
    this.props.stats_store.getStats();
  }

  renderTorrents() {
    return this.props.torrents_store.torrents.map((torrent) => {
      return <Torrent torrent={torrent}/>;
    });
  }

  render() {
    return (
      <div>
        <header>
          <ActionToolbar/>
          <FilterToolbar/>
        </header>
        <main role="main">
          {this.renderTorrents()}
        </main>
        <footer>
          <StatusToolbar/>
        </footer>
        {renderDevTools()}
      </div>
    )
  };
}

export default inject('torrents_store', 'stats_store')(observer(App));
