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
import AddBus from './components/pages/addBus';
import SideNav from './components/widget/sidenav';
import Header from './components/widget/header';
import { parse } from 'ipaddr.js';
import UpdateBus from './components/pages/updateBus';
import UpdateSingleBus from './components/pages/updateSingleBus';
import ViewBus from './components/pages/viewBus';
import AddHalt from './components/pages/addHalt';
import ViewHalt from './components/pages/viewHalt';

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

            {/* login */}
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

            {/* register */}
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

            {/* dashboard */}
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

            {/* addbus */}
            <Route 
              exact path="/addbus" 
              render={props => 
                isAuthenticated ? (
                  <AddBus {...props} setAuth={setAuth}/>
                ) : (
                  <Redirect to="/smartride/login" />
                )
              }
            />

            {/* updatebus */}
            <Route 
              exact path="/updatebus" 
              render={props => 
                isAuthenticated ? (
                  <UpdateBus {...props} setAuth={setAuth}/>
                ) : (
                  <Redirect to="/smartride/login" />
                )
              }
            />

            {/* updatesinglebus */}
            <Route 
              exact path="/updatesinglebus/:id" 
              render={props => 
                isAuthenticated ? (
                  <UpdateSingleBus {...props} setAuth={setAuth}/>
                ) : (
                  <Redirect to="/smartride/login" />
                )
              }
            />

            {/* viewbus */}
            <Route 
              exact path="/viewbus" 
              render={props => 
                isAuthenticated ? (
                  <ViewBus {...props} setAuth={setAuth}/>
                ) : (
                  <Redirect to="/smartride/login" />
                )
              }
            />

            {/* addhalt */}
            <Route 
              exact path="/addhalt" 
              render={props => 
                isAuthenticated ? (
                  <AddHalt {...props} setAuth={setAuth}/>
                ) : (
                  <Redirect to="/smartride/login" />
                )
              }
            />

            {/* viewhalt */}
            <Route 
              exact path="/viewhalt" 
              render={props => 
                isAuthenticated ? (
                  <ViewHalt {...props} setAuth={setAuth}/>
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
