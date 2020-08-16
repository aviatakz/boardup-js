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
import InterviewsCreate from './components/surveys/InterviewsCreate';
import Users from './components/users/Users'
import Login from './components/general/Login';
import { ProtectedRoute } from "./components/protected-route";
import InterviewsResults from './components/surveys/InterviewsResults'
import auth from './components/auth'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: ''
    }
  }
  handleAuth = (e) => {
    this.setState({
      isLoggedIn: true,
      username: 'tester'
    })
  }
  componentDidMount() {
    if (auth.isAuthenticated()) {
      this.setState({
        isLoggedIn: true,
        username: 'tester'
      })
    } else (
      this.setState({
        isLoggedIn: false,
        username: ''
      })
    )
  }
  handleQuit = (e) => {
    auth.logout(() => {
      e.push("/login");
    }
    );
    this.setState({
      isLoggedIn: false,
      username: ''
    })

  }
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <div className='row'>
            <Navbar isLoggedIn={this.state.isLoggedIn} username={this.state.username} handleQuit={(e) => this.handleQuit(e)} />
            <Switch>
              <ProtectedRoute path='/' exact component={Home} />
              <ProtectedRoute path='/groups' component={Groups} />
              <ProtectedRoute path='/users' component={Users} />
              <ProtectedRoute path='/profile' component={Profile} />
              <ProtectedRoute path='/settings' component={Settings} />

              <ProtectedRoute path='/interviews' exact component={InterviewsList} />
              <ProtectedRoute path='/interviews/:id/edit' component={InterviewsEdit} />
              <ProtectedRoute path='/interviews/new' component={InterviewsCreate} />
              <ProtectedRoute path='/interviews/results/:user_id/:survey_id' component={InterviewsResults} />

              <ProtectedRoute path='/audience/:survey_id' exact component={AudienceList} />
              <ProtectedRoute path='/audience/:survey_id/:user_id/new' exact component={AudienceCreate} />
              <ProtectedRoute path='/audience/:survey_id/:user_id/edit' exact component={AudienceEdit} />

              <Route exact path='/login' render={props => (<Login {...props}
                handleAuth={(e) => this.handleAuth(e)}
              />)} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
