import React from 'react';
import DevTools, { setLogEnabled } from 'mobx-react-devtools';

function renderDevTools() {
  if (process.env.NODE_ENV !== 'development') return null;

  setLogEnabled(true);

  return <DevTools position={{top: 72, right: 20}} />;
}

/**
 * App component acts as the application layout.
 */
function App() {
  return (
    <div>
      <header>
        Welcome to Transmission
      </header>
      <main role="main">
        <h1>
          Next generation Transmission UI
        </h1>
      </main>
      {renderDevTools()}
    </div>
  );
}

export default App;
