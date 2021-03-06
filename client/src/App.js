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
import PatientRoute from "./Components/PrivateRoute/PatientRoute";
import DoctorRoute from "./Components/PrivateRoute/DoctorRoute";
import NurseRoute from "./Components/PrivateRoute/NurseRoute";
import Error from "./Components/Error";
import Clinics from "./Components/Clinics/Clinics";
import ClinicHomepage from "./Components/Clinics/ClinicHomepage";
import NurseSignUp from "./Components/SignUp/NurseSignUp";
import DoctorSignUp from "./Components/SignUp/DoctorSignUp";

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
            <Route exact path='/signup' component={ SignUp }/>
            <Route path='/signup/nurse' component={ NurseSignUp }/>
            <Route path='/signup/doctor' component={ DoctorSignUp } />
            <Route path='/logout' component={ Logout }/>
            <Route path='/error' component={ Error } />

            {/* Nurse Routes */}
            <NurseRoute path='/homepage/nurse' component={ NurseHomepage }/>
            <NurseRoute exact path='/homepage/nurse/scheduleAppointment' component={ NurseHomepage }/>
            <NurseRoute exact path='/homepage/nurse/ViewAppointment' component={ NurseHomepage }/>

            {/* Doctor Routes */}
            <DoctorRoute exact path='/homepage/doctor' component={ DoctorHomepage }/>
            <DoctorRoute exact path='/homepage/doctor/schedule' component={ DoctorSchedule }/>
            <DoctorRoute exact path='/timeslot/doctor' component={ CreateTimeslot }/>

            {/* Patient Routes */}
            <PatientRoute path='/homepage/patient' component={ PatientHomepage }/>
            <PatientRoute exact path='/homepage/patient/scheduleAppointment' component={ PatientHomepage }/>
            <PatientRoute exact path='/homepage/patient/myAppointment' component={ PatientHomepage }/>
            <PatientRoute exact path='/cart' component={ Cart }/>

            {/* Clinics */}
            <Route exact path='/clinics' component={ Clinics } />

            <Route render={() => (<div> Sorry, this page does not exist. </div>)} />
          </Switch>
        </div>
    );
  }
}

export default App;
