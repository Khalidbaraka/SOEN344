import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import About from './Components/About';
import AppNavbar from './Components/AppNavbar';
import DoctorHomepage from "./Components/Homepage/DoctorHomepage";
import Home from './Components/Home';
import Identification from './Components/Appointment/Identification';
import Items from './Components/Items/Items';
import Login from './Components/Login/Login'
import Logout from './Components/Logout';
import NurseHomepage from './Components/Homepage/NurseHomepage';
import PatientHomepage from "./Components/Homepage/PatientHomepage";
import PatientNavBar from "./Components/PatientNavBar";
import SignUp from './Components/SignUp/SignUp'
import UpdateSchedule from "./Components/Schedule/UpdateSchedule";

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
            <Route path='/homepage/doctor' component={ DoctorHomepage }/>
            {/* might be unneeded. TODO */}
            {/*<Route path='/homepage/doctor/updateSchedule' component={ UpdateSchedule }/>*/}

            {/* Patient Routes */}
            <Route path='/homepage/patient' component={ PatientHomepage }/>
            <Route exact path='/homepage/patient/scheduleAppointment' component={ PatientHomepage }/>
            <Route exact path='/homepage/patient/myAppointment' component={ PatientHomepage }/>

            <Route render={() => (<div> Sorry, this page does not exist. </div>)} />
          </Switch>
        </div>
    );
  }
}

export default App;
