import React from 'react';
import ReactDOM from 'react-dom/client';

import CSSModules from 'react-css-modules';
import styles from './index.module.scss';

import App from './App';

import reportWebVitals from './reportWebVitals';

const RootComponent = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

const ConnectedRootComponent = CSSModules(RootComponent, styles);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<ConnectedRootComponent />);

reportWebVitals();
