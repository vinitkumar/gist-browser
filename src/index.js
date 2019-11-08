import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.createRoot(
  document.getElementById('root')
).render(<App />);
registerServiceWorker();
