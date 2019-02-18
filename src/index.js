import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App, NewApp} from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<NewApp />, document.getElementById('root'));
registerServiceWorker();
