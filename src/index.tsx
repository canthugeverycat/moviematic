import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.scss';

const RootComponent = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<RootComponent />);

reportWebVitals();
