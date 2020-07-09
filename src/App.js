import React from 'react';
import './App.css';
import Navbar from './Navbar.js';
import Home from './Home.js';
import Workers from './Workers.js';
import Groups from './Groups.js';
import Interviews from './Interviews.js';
import Profile from './Profile.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
    <div className="App container-fluid">
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/groups' component={Groups} />
          <Route path='/interviews' component={Interviews} />
          <Route path='/profile' component={Profile} />
          <Route path='/workers' component={Workers} />
        </Switch>
    </div>
    </Router>
  );
}

export default App;
