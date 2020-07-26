import React from 'react';
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import Workers from './components/AudienceList.js';
import Groups from './components/Groups.js';
import Interviews from './components/Interviews.js';
import Profile from './components/Profile.js';
import Settings from './components/Settings';
import InterviewsList from './components/InterviewsList';
import Audience from './components/Audience';
import AudienceList from './components/AudienceList'
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
          <Route path='/api/interviews' exact component={InterviewsList} />
          <Route path='/api/interviews/new' component={Interviews} />
          <Route path='/api/audience' exact component={AudienceList} />
          <Route path='/api/audience/new'component={Audience} />
          <Route path='/profile' component={Profile} />
          <Route path='/settings' component={Settings} />
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
