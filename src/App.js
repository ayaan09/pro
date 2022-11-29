import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Login from "./components/login/login";
import SignUp from "./components/signup/signup";
import './components/Feed/App.css';
import Homepage from "./components/Feed/Home/Homepage.js"
import Mailbox from './components/Mailbox/mailbox'
import CommFeedRoute from './components/Feed/Community/Comm_feed_route'
import ChatRouter from './components/tutorchats/chatrouter'
import Community from './components/Feed/Community/Community.js'
import Notifications from './components/Feed/Notifications/Notifications.js'
import Profile from './components/Feed/Profile/Profile.js'
import Settings from './components/Feed/Settings.js'
import GlobalUI from './components/globalmessage/globalUI';
import Registerme from './components/templates/registerme'

import axios from 'axios';
import Cookies from 'universal-cookie';

function App() {
  const cookies = new Cookies();

  /**
   * receives the user information from server
   * creates a cookie if user information is received and loads the feed
   * otherwise displays error
   * @param {Object} res - contains user information
   */

  function storeToken(res) {
    axios.defaults.headers.common['x-auth-token'] = res.data.token;
    cookies.set('token', res.data.token, { path: '/' });
    axios.get('https://sunnysocial.herokuapp.com/api/auth/user', {
      req: res.data
    })
      .then(function (response) {
        cookies.set('user', response.data, { path: '/' });
        window.location.href = '/';
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  /**
   * Checks if the path has /logout in it
   * if it does then the cookie is deleted and the user is logged out
   * User is then redirected to the login page
   */

  if (window.location.pathname === '/logout') {
    console.log("signing out");
    cookies.remove('user', { path: '/' });
    cookies.remove('token', { path: '/' });
    window.location.href = '/';
  }

  // router to determine what page to display based on the URL
  return (
    <Router>
      <Switch>
        {/* route to signup */}
        <Route path="/signup">
          {!cookies.get('user') ? <SignUp storeToken={storeToken} /> : <Redirect to="/feed" />}
        </Route>
        {/* route to main page */}
        <Route exact path="/">
          {!cookies.get('user') ? <Redirect to="/login" /> : <Redirect to="/feed" />}
        </Route>
        {/* route to login */}
        <Route path="/login">
          {!cookies.get('user') ? <Login storeToken={storeToken} /> : <Redirect to="/feed" />}
        </Route>
        <React.Fragment>
          <div className="app">
            {/* route to feed */}
            <Route exact path="/feed">
              {!cookies.get('user') ? <Redirect to="/" /> : <Homepage user={cookies.get('user')} token={cookies.get('token')} />}
            </Route>
            {/* route to community list */}
            <Route exact path="/community">
              {!cookies.get('user') ? <Redirect to="/" /> : <Community user={cookies.get('user')} token={cookies.get('token')} />}
            </Route>
            {/* route to my profile */}
            <Route exact path="/tutor">
              {!cookies.get('user') ? <Redirect to="/" /> : <Profile user={cookies.get('user')} token={cookies.get('token')} />}
            </Route>
            {/* Route to tutor chat*/}
            <Route path="/tutor/:id">
              {!cookies.get('user') ? <Redirect to="/" /> : <ChatRouter user={cookies.get('user')} token={cookies.get('token')} />}
            </Route>
            {/* route to notifications */}
            <Route exact path="/notifications">
              {!cookies.get('user') ? <Redirect to="/" /> : <Notifications user={cookies.get('user')} token={cookies.get('token')} />}
            </Route>
            {/* route to community */}
            <Route path="/community/:id">
              {!cookies.get('user') ? <Redirect to="/" /> : <CommFeedRoute user={cookies.get('user')} token={cookies.get('token')} />}
            </Route>
            {/* route to settings */}
            <Route path="/settings">
              {!cookies.get('user') ? <Redirect to="/" /> : <Settings user={cookies.get('user')} token={cookies.get('token')} />}
            </Route>
            <Route path="/mailbox/">
              {!cookies.get('user') ? <Redirect to="/" /> : <Mailbox user={cookies.get('user')} token={cookies.get('token')} />}
            </Route>
            {/* route to chat */}
            <Route path="/chat">
              {!cookies.get('user') ? <Redirect to="/" /> : <GlobalUI user={cookies.get('user')} token={cookies.get('token')} />}
            </Route>
            <Route path="/registration">
              {!cookies.get('user') ? <Redirect to="/" /> : <Registerme user={cookies.get('user')} token={cookies.get('token')} />}
            </Route>
          </div>
        </React.Fragment>
      </Switch>
    </Router>
  );
}

export default App;
