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

  componentDidMount() {
    this.props.torrents_store.getAll();
  }

  render() {
    return (
      <div>
        <header>
          Welcome to Transmission
        </header>
        <main role="main">
          <ActionToolbar/>
          <FilterToolbar/>
          <h1>
            Next generation Transmission UI
          </h1>
          <p>{this.props.torrents_store.torrents.map((t) => <Torrent torrent={t}/>)}</p>
          <StatusToolbar/>
        </main>
        {renderDevTools()}
      </div>
    )
  };
}

export default inject('torrents_store')(observer(App));
