import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import About from './Components/About';
import AppNavbar from './Components/AppNavbar';
import Home from './Components/Home';
import Items from './Components/Items/Items';
import NurseLogin from './Components/NurseLogin';
import PatientLogin from './Components/PatientLogin';

class App extends Component {
  render() {
    return (
        <div className="Container">
          <AppNavbar/>

          {/* This file is the starting point, build components from there. 
            * Component Routes. Please check https://auth0.com/blog/react-router-4-practical-tutorial/ for Nested Routes
          */}
          
          <Switch>
            <Route exact path='/' component={ Home }/>
            <Route path='/about' component={ About}/>
            <Route path='/items' component={ Items }/>
            <Route path='/nurselogin' component={ NurseLogin }/>
            <Route path='/patientlogin' component={ PatientLogin }/>
            <Route render={() => (<div> Sorry, this page does not exist. </div>)} />
          </Switch>
        </div>
    );
  }
}

export default App;
