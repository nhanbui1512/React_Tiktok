import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './GlobalStyles/index.js';
import { isMobile } from 'react-device-detect';

import { ThemeProvider } from './Context';
import Mobile from './MobileApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalStyles>
    <ThemeProvider>
      {isMobile ? <Mobile /> : <App />}
      {/* <App /> */}
    </ThemeProvider>
  </GlobalStyles>,
);

reportWebVitals();
