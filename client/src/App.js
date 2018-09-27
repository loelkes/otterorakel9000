import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import DashboardPage from './components/DashboardPage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={DashboardPage} />
        </div>
      </Router>
    );
  };
}

export default App;
