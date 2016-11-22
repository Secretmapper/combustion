import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import DevTools, { setLogEnabled } from 'mobx-react-devtools';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import TorrentList from 'components/TorrentList';
import Inspector from 'components/Inspector';
import ActionToolbar from 'components/ActionToolbar';
import FilterToolbar from 'components/FilterToolbar';
import StatusToolbar from 'components/StatusToolbar';

import OpenDialog from 'components/OpenDialog';
import PreferencesDialog from 'components/PreferencesDialog';
import ConnectionDialog from 'components/ConnectionDialog';
import StatisticsDialog from 'components/StatisticsDialog';
import AboutDialog from 'components/AboutDialog';
import PromptDialog from 'components/PromptDialog';

import styles from './styles/index.css';

function renderDevTools() {
  if (process.env.NODE_ENV !== 'development') return null;

  setLogEnabled(false);

  return <DevTools position={{bottom: 0, right: 0}} />;
}

/**
 * App component acts as the application layout.
 */
@inject('torrents_store', 'stats_store', 'session_store', 'view_store')
@observer
@CSSModules(styles)
class App extends Component {
  componentDidMount() {
    this.props.session_store.getSession().then(() => {
      this.props.stats_store.getStats();
      this.props.torrents_store.fetch();

      this.interval = setInterval(() => {
        this.props.torrents_store.fetch();
      }, 5000);
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  @autobind onToggleContextMenu() {
    this.props.view_store.toggleContextMenus();
  }

  render() {
    const isInspectorShown = this.props.view_store.isInspectorShown;

    return (
      <div styleName='container' onClick={this.onToggleContextMenu}>
        <header styleName='header'>
          <ActionToolbar/>
          <FilterToolbar/>
        </header>
        <main styleName='main' role='main'>
          <div styleName='list'>
            <TorrentList />
          </div>
          { isInspectorShown &&
            <div styleName='details'>
              <Inspector />
            </div>
          }
        </main>
        <footer styleName='footer'>
          <StatusToolbar/>
        </footer>

        <OpenDialog />
        <PreferencesDialog />
        <ConnectionDialog />
        <StatisticsDialog />
        <AboutDialog />

        <PromptDialog
          header='Set location'
          action='Apply'
          placeholder='' /* TODO: To be defined when this promp is moved to torrent view */
          question='Location'
          toggle={this.props.view_store.isLocationPromptShown}
          onToggle={() => this.props.view_store.toggleLocationPrompt()}
          onSubmit={(value) => alert('location: ' + value)}
        />

        <PromptDialog
          header='Rename torrent'
          action='Rename'
          question='Enter new name'
          placeholder='' /* TODO: To be defined when this promp is moved to torrent view */
          toggle={this.props.view_store.isRenamePromptShown}
          onToggle={() => this.props.view_store.toggleRenamePrompt()}
          onSubmit={(value) => alert('rename: ' + value)}
        />

        {renderDevTools()}
      </div>
    )
  };
}

export default App;
