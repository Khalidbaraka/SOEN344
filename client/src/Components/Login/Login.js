import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import DoctorLogin from './DoctorLogin';
import NurseLogin from './NurseLogin';
import PatientLogin from './PatientLogin';

import axios from 'axios';

class Login extends Component{
       render() {
       
        return (
            <div className="container-fluid" style={{width: 500}}>
            <h1 className="text-center my-4"> Login </h1>
            <Tabs defaultActiveKey="patient" id="uncontrolled-tab-example" unmountOnExit="True">
              <Tab eventKey="doctor" title="Doctor">
                <DoctorLogin />
              </Tab>
              <Tab eventKey="nurse" title="Nurse">
                <NurseLogin />
              </Tab>
              <Tab eventKey="patient" title="Patient">
                <PatientLogin />
              </Tab>
            </Tabs>

            </div>
        );
      }
}
export default Login;