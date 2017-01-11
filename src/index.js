import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import { reaction } from 'mobx';

import * as stores from './stores/';

import App from './components/App/';
import logoImage from 'images/logo.png';

const rootEl = document.getElementById('root');

reaction(
  () => [
    stores.view_store.notificationsEnabled,
    stores.torrents_store.startedTorrents,
    stores.torrents_store.completedTorrents
  ],
  ([notificationsEnabled, startedTorrents, completedTorrents]) => {
    if (!notificationsEnabled) return;

    const TIMEOUT = 5000;

    if (startedTorrents.length > 0) {
      startedTorrents.forEach((torrent) => {
        const title = `Torrent Added`;
        const options = {
          body: torrent.name,
          icon: logoImage,
          tag: title // Hash?
        };

        let notification = new window.Notification(title, options);

        notification.onclick = () => {
          window.focus();
          notification.close();
        }

        setTimeout(() => notification.close(), TIMEOUT);
      });
    }

    if (completedTorrents.length > 0) {
      completedTorrents.forEach((torrent) => {
        const title = `Torrent Completed`;
        const options = {
          body: torrent.name,
          icon: logoImage,
          tag: title // Hash?
        };

        let notification = new window.Notification(title, options);

        notification.onclick = () => {
          window.focus();
          notification.close();
        }

        setTimeout(() => notification.close(), TIMEOUT);
      });
    }
  }
);

ReactDOM.render(
  <AppContainer>
    <Provider {...stores}>
      <App />
    </Provider>
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;

    ReactDOM.render(
      <AppContainer>
        <Provider {...stores}>
          <NextApp />
        </Provider>
      </AppContainer>,
      rootEl
    );
  });
}
