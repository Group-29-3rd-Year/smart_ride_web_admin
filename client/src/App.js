import React, {Fragment, useState} from 'react';
import './App.css';

import {BrowserRouter as Router, 
        Switch, 
        Route, 
        Redirect
} from "react-router-dom";

//components

import Login from "./components/login";
import Register from './components/register';
import Dashboard from './components/dashboard';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route 
              exact path="/smartride/login" 
              render={props => 
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth}/>
                ) : (
                  <Redirect to="/smartride/dashboard" />
                )
              }
            />
            <Route 
              exact path="/smartride/register" 
              render={props => 
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth}/>
                ) : (
                  <Redirect to="/smartride/login" />
                )
              }
            />
            <Route 
              exact path="/smartride/dashboard" 
              render={props => 
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth}/>
                ) : (
                  <Redirect to="/smartride/login" />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
