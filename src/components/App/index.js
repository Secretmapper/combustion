import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import DevTools, { setLogEnabled } from 'mobx-react-devtools';
import { inject, observer } from 'mobx-react';
import getFilteredTorrents from 'stores/util/getFilteredTorrents';
import autobind from 'autobind-decorator';

import { Layout, NavDrawer, Panel } from 'react-toolbox';

import WithAside from 'components/WithAside';
import Torrent from 'components/Torrent';
import ListInfo from 'components/Torrent/ListInfo';
import SelectableList from 'components/SelectableList';
import Inspector from 'components/Inspector';
import Header from 'components/Header';
import Footer from 'components/Footer';
import DropzoneLayer from 'components/DropzoneLayer';
import DrawerMenu from 'components/DrawerMenu';
import OpenDialog from 'components/dialogs/OpenDialog';
import DeleteDialog from 'components/dialogs/DeleteDialog';
import PreferencesDialog from 'components/dialogs/PreferencesDialog';
import ConnectionDialog from 'components/dialogs/ConnectionDialog';
import StatisticsDialog from 'components/dialogs/StatisticsDialog';
import AboutDialog from 'components/dialogs/AboutDialog';
import PromptDialog from 'components/dialogs/PromptDialog';

import 'typeface-roboto';
import styles from './styles/index.css';

setLogEnabled(false);

function renderDevTools() {
  if (process.env.NODE_ENV !== 'development') return null;

  return <DevTools position={{bottom: 0, right: 0}} />;
}

/**
 * App component acts as the application layout.
 */
@inject('torrents_store', 'stats_store', 'session_store', 'prefs_store', 'view_store')
@observer
@CSSModules(styles)
class App extends Component {
  state = {
    showDrawer: false
  }

  componentDidMount() {
    const PERMISSION_GRANTED = 'granted';
    const PERMISSION_DENIED = 'denied';

    this.props.session_store.getSession().then(() => {
      this.props.stats_store.getStats();
      this.props.torrents_store.fetch();

      this.interval = setInterval(() => {
        this.props.torrents_store.fetch();
      }, 5000);
    });

    // Desktop notifications
    if (window.Notification) {
      if (window.Notification.permission === PERMISSION_GRANTED) {
        this.props.view_store.toggleNotificationsEnabled(true);
      } else if (Notification.permission !== PERMISSION_DENIED) {
        window.Notification.requestPermission((permission) => {
          this.props.view_store.toggleNotificationsEnabled(permission === PERMISSION_GRANTED);
        });
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  @autobind onToggleDrawer() {
    this.setState({ showDrawer: !this.state.showDrawer })
  }

  @autobind onHideDrawer() {
    this.setState({ showDrawer: false })
  }

  @autobind onToggleContextMenu() {
    this.props.view_store.toggleContextMenus();
  }

  render() {
    const { view_store, torrents_store, prefs_store } = this.props;
    const {
      selectedTorrents,
      isInspectorShown,
    } = view_store;

    const firstTorrent = torrents_store.getByIds(selectedTorrents)[0] || {};
    const filteredTorrents = getFilteredTorrents(torrents_store, prefs_store);

    return (
      <DropzoneLayer>
        <Layout styleName='layout'>
          <NavDrawer
            active={this.state.showDrawer}
            onOverlayClick={this.onHideDrawer}
            styleName='nav_drawer'
          >
            <DrawerMenu />
          </NavDrawer>
          <Panel>
            <div styleName='container' onClick={this.onToggleContextMenu}>
              <div style={{ overflow: 'hidden' }}>
                <WithAside
                  aside={<Inspector />}
                  showAside={isInspectorShown}
                  styleName='container__inner'
                >
                  <main styleName='main' role='main'>
                    <div styleName='list'>
                      <SelectableList
                        selectedItemIds={view_store.selectedTorrents}
                        lastSelectedItemId={view_store.lastSelectedTorrent}

                        onSelectItem={(id) => view_store.setSelected(id)}
                        onToggleSelectItem={(id) => view_store.toggleSelected(id)}
                        onSelectRange={(id, selectedIds) => view_store.addSelectedRange(id, selectedIds)}
                      >
                        {filteredTorrents.map((torrent, index) => (
                          <SelectableList.Item key={index} id={torrent.id}>
                            <Torrent torrent={torrent}/>
                          </SelectableList.Item>
                        ))}
                      </SelectableList>
                      <ListInfo />
                    </div>
                  </main>
                </WithAside>
                <Header onToggleDrawer={this.onToggleDrawer} />
                <Footer />
              </div>

              <OpenDialog />
              <DeleteDialog />
              <PreferencesDialog />
              <ConnectionDialog />
              <StatisticsDialog />
              <AboutDialog />

              <PromptDialog
                header='Set location'
                action='Apply'
                placeholder={firstTorrent.downloadDir}
                question='Location'
                toggle={this.props.view_store.isLocationPromptShown}
                onToggle={() => this.props.view_store.toggleLocationPrompt()}
                onSubmit={(value) => this.props.torrents_store.setLocation([selectedTorrents[0]], value)}
              />

              <PromptDialog
                header='Rename torrent'
                action='Rename'
                question='Enter new name'
                placeholder={firstTorrent.name}
                toggle={this.props.view_store.isRenamePromptShown}
                onToggle={() => this.props.view_store.toggleRenamePrompt()}
                onSubmit={(value) => this.props.torrents_store.rename([selectedTorrents[0]], firstTorrent.name, value)}
              />

              {renderDevTools()}
            </div>
          </Panel>
        </Layout>
      </DropzoneLayer>
    )
  };
}

export default App;
