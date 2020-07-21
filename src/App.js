import React from 'react';
import './App.css';
import Navbar from './Navbar.js';
import Home from './Home.js';
import Workers from './Workers.js';
import Groups from './Groups.js';
import Interviews from './Interviews.js';
import Profile from './Profile.js';
import Settings from './Settings';
import InterviewsList from './InterviewsList';
import Audience from './Audience';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
    <div className="container-fluid">
      <div className='row'>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/groups' component={Groups} />
          <Route path='/api/interviews' component={InterviewsList} />
          <Route path='/api/audience' component={Audience} />
          <Route path='/interviews' component={Interviews} />
          <Route path='/profile' component={Profile} />
          <Route path='/workers' component={Workers} />
          <Route path='/settings' component={Settings} />
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
