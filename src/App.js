import React from 'react';
import Navbar from './components/general/Navbar.js';
import Home from './components/general/Home.js';
import Groups from './components/users/Groups.js';
import Profile from './components/users/Profile.js';
import Settings from './components/general/Settings';
import InterviewsList from './components/surveys/InterviewsList';
import AudienceCreate from './components/audience/AudienceCreate';
import AudienceList from './components/audience/AudienceList'
import AudienceEdit from './components/audience/AudienceEdit'
import InterviewsEdit from './components/surveys/InterviewsEdit'
import InterviewsCreate from './components/surveys/InterviewsCreate.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';



function App() {
  return (
    <Router>
      <div className="container-fluid">
        <div className='row'>
          <Navbar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/groups' component={Groups} />

            <Route path='/interviews' exact component={InterviewsList} />
            <Route path='/interviews/:id/edit' component={InterviewsEdit} />
            <Route path='/interviews/new' component={InterviewsCreate} />

            <Route path='/audience/:survey_id' exact component={AudienceList} />
            <Route path='/audience/:survey_id/:user_id/new' exact component={AudienceCreate} />
            <Route path='/audience/:survey_id/:user_id/edit' exact component={AudienceEdit} />

            <Route path='/profile' component={Profile} />
            <Route path='/settings' component={Settings} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
