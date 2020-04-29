import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { logoutUser } from './actions/authActions';
// import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
// import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import CreateProfile from './components/create-profile/CreateProfile';
// import EditProfile from './components/edit-profile/EditProfile';
// import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Post from './components/posts/Posts';
// import NotFound from './components/not-found/NotFound';
import { SET_CURRENT_USER } from './actions/types';
import FacebookFollow from './components/profile/FacebookFollow';


if (localStorage.jwtToken){
  //decode
  const decoded = jwt_decode(localStorage.jwtToken);
  
  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime){
    //Logout user
    store.dispatch(logoutUser());
    //Redirect user login
    window.location.href = '/login';
  }

  //set auth header
  setAuthToken(localStorage.jwtToken);

  //dispatch call
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  });
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <FacebookFollow/>
            
            <Route exact path="/register" component={Register} />
            <div className="container">
            <Route exact path="/login" component={Login} />
            <Route exact path="/post" component={Post} />  
       
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
              <PrivateRoute
                exact
                path="/profile"
                component={Profile}
                
              />
            </Switch>
                            
              <Switch>
                
              </Switch>
             
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;