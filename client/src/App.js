import React, {Fragment, useState, useEffect} from 'react';
import './App.css';

import {
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Redirect
} from "react-router-dom";

//components

import Login from "./components/login";
import Register from './components/register';
import Dashboard from './components/dashboard';
import SideNav from './components/widget/sidenav';
import Header from './components/widget/header';
import { parse } from 'ipaddr.js';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth(){
    try {
      
      const response  = await fetch("http://localhost:5000/smartride/is-verify", {
        method: "GET",
        headers: { token : localStorage.token }
      });

      const parseRes = await response.json()

      console.log(parseRes);
      parseRes === true ? setIsAuthenticated(true): setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    isAuth()
  })

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
