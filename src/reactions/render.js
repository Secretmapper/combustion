import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';

import App from 'components/App';

export default function (stores) {
  const rootEl = document.getElementById('root');

  ReactDOM.render(
    <AppContainer>
      <Provider {...stores}>
        <App />
      </Provider>
    </AppContainer>,
    rootEl
  );

  if (module.hot) {
    module.hot.accept('components/App', () => {
      const NextApp = require('components/App').default;

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
}
