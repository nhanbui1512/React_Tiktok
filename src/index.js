import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './GlobalStyles/index.js';
import { isMobile } from 'react-device-detect';

import { ThemeProvider } from './Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalStyles>
    <ThemeProvider>
      {isMobile ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <p> Only Support Desktop UI</p>
        </div>
      ) : (
        <App />
      )}
      {/* <App /> */}
    </ThemeProvider>
  </GlobalStyles>,
);

reportWebVitals();
