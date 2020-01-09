import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Landing from './components/Landing/Landing';

ReactDOM.render(
    <Router>
        <Route path="/" exact component={Landing} />
        <Route path="/app" exact component={App} />
    </Router>,
     document.getElementById('root')
);
