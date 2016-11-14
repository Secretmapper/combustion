import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import DevTools, { setLogEnabled } from 'mobx-react-devtools';
import { inject, observer } from 'mobx-react';

import TorrentList from 'components/TorrentList';
import Inspector from 'components/Inspector';
import ActionToolbar from 'components/ActionToolbar';
import FilterToolbar from 'components/FilterToolbar';
import StatusToolbar from 'components/StatusToolbar';
import OpenDialog from 'components/OpenDialog';

import styles from './styles/index.css';

function renderDevTools() {
  if (process.env.NODE_ENV !== 'development') return null;

  setLogEnabled(true);

  return <DevTools position={{bottom: 10, right: 10}} />;
}

function renderOpenDialog() {
  return <OpenDialog />;
}

/**
 * App component acts as the application layout.
 */
@inject('torrents_store', 'stats_store', 'session_store')
@observer
@CSSModules(styles)
class App extends Component {
  componentDidMount() {
    this.props.session_store.getSession().then(() => {
      const sessionId = this.props.session_store.sessionId;
      this.props.stats_store.getStats(sessionId);
      this.props.torrents_store.getAll(sessionId);

      this.interval = setInterval(() => {
        this.props.torrents_store.getAll(sessionId);
      }, 5000);
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div styleName='container'>
        <header>
          <ActionToolbar/>
          <FilterToolbar/>
        </header>
        <main styleName='main' role='main'>
          <TorrentList />
          <Inspector />
        </main>
        <footer>
          <StatusToolbar/>
        </footer>
        {renderOpenDialog()}
      </div>
    )
  };
}

export default App;
