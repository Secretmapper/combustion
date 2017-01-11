import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import {autorun} from 'mobx';

import * as stores from './stores/';

import App from './components/App/';
import logoImage from 'images/logo.png';

const rootEl = document.getElementById('root');

autorun(() => {
  if (!stores.view_store.notificationsEnabled) return;

  const TIMEOUT = 5000;
  const completedTorrents = stores.torrents_store.completedTorrents;

  if (completedTorrents.length > 0) {
    completedTorrents.forEach((torrent) => {
      const title = `Completed torrent "${torrent.name}" title`;
      const options = {
        body: `Completed torrent "${torrent.name}" body`,
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
});

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
