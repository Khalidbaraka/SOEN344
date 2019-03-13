import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import About from './Components/About';
import AppNavbar from './Components/AppNavbar';
import Cart from './Components/Cart/Cart';
import DoctorHomepage from "./Components/Homepage/DoctorHomepage";
import Home from './Components/Home';
import Items from './Components/Items/Items';
import DoctorSchedule from './Components/Schedule/DoctorSchedule';
import Login from './Components/Login/Login'
import Logout from './Components/Logout';
import NurseHomepage from './Components/Homepage/NurseHomepage';
import PatientHomepage from "./Components/Homepage/PatientHomepage";
import SignUp from './Components/SignUp/SignUp'
import CreateTimeslot from "./Components/Timeslots/CreateTimeslot";

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
            <Route path='/login' component={ Login }/>
            <Route path='/signup' component={ SignUp }/>
            <Route path='/logout' component={ Logout }/>

            {/* Nurse Routes */}
            <Route path='/homepage/nurse' component={ NurseHomepage }/>

            {/* Doctor Routes */}
            <Route exact path='/homepage/doctor' component={ DoctorHomepage }/>
            <Route exact path='/homepage/doctor/schedule' component={ DoctorSchedule }/>
            <Route exact path='/timeslot/doctor' component={ CreateTimeslot }/>

            {/* Patient Routes */}
            <Route path='/homepage/patient' component={ PatientHomepage }/>
            <Route exact path='/homepage/patient/scheduleAppointment' component={ PatientHomepage }/>
            <Route exact path='/homepage/patient/myAppointment' component={ PatientHomepage }/>
            <Route exact path='/homepage/nurse/ViewAppointment' component={ NurseHomepage }/>
            <Route exact path='/cart' component={ Cart }/>

            <Route render={() => (<div> Sorry, this page does not exist. </div>)} />
          </Switch>
        </div>
    );
  }
}

export default App;
