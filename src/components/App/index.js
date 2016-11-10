import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import DevTools, { setLogEnabled } from 'mobx-react-devtools';
import { inject, observer } from 'mobx-react';

import TorrentList from 'components/TorrentList';
import ActionToolbar from 'components/ActionToolbar';
import FilterToolbar from 'components/FilterToolbar';
import StatusToolbar from 'components/StatusToolbar';
import OpenDialog from 'components/OpenDialog';

import styles from './styles';

function renderDevTools() {
  if (process.env.NODE_ENV !== 'development') return null;

  setLogEnabled(true);

  return <DevTools position={{top: 20, right: 20}} />;
}

/**
 * App component acts as the application layout.
 */
@inject('torrents_store', 'stats_store', 'session_store')
@observer
@CSSModules(styles)
class App extends Component {
  constructor(props) {
    super(props);

    this.renderOpenDialog = this.renderOpenDialog.bind(this);
  }

  componentDidMount() {
    this.props.torrents_store.getAll();
    this.props.stats_store.getStats();
    this.props.session_store.getSession();
  }

  renderOpenDialog() {
    return (
      <OpenDialog />
    );
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
        </main>
        <footer>
          <StatusToolbar/>
        </footer>
        {renderDevTools()}
        {this.renderOpenDialog()}
      </div>
    )
  };
}

export default App;
