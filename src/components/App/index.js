import React, { Component} from 'react';
import DevTools, { setLogEnabled } from 'mobx-react-devtools';
import { inject, observer } from 'mobx-react';

import Torrent from '../Torrent';
import ActionToolbar from '../ActionToolbar';
import FilterToolbar from '../FilterToolbar';
import StatusToolbar from '../StatusToolbar';

function renderDevTools() {
  if (process.env.NODE_ENV !== 'development') return null;

  setLogEnabled(true);

  return <DevTools position={{top: 72, right: 20}} />;
}

/**
 * App component acts as the application layout.
 */
class App extends Component {
  constructor(props) {
    super(props);

    this.renderTorrents = this.renderTorrents.bind(this);
  }

  componentDidMount() {
    this.props.torrents_store.getAll();
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

export default inject('torrents_store')(observer(App));
