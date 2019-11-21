import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom' // renaming BrowserRouter Router
import * as serviceWorker from './serviceWorker';

import App from './App';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

ReactDOM.render( // ALWAYS WRAP APP IN ROUTER SINCE IT'S A CHILD OF ROUTER. Two arguments - what component and where I want it to render
    <Router> 
        <App />
    </Router>, 
document.getElementById('root') // ATTACHING ALL JS TO THIS ROOT WHERE WE WANT TO RENDER IT
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
