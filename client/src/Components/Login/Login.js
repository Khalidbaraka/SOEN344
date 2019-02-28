import {Col, Row, Tab, Tabs} from 'react-bootstrap';
import React, { Component } from 'react';

import DoctorLogin from './DoctorLogin';
import NurseLogin from './NurseLogin';
import PatientLogin from './PatientLogin';

class Login extends Component{
  render() {
  
    return (
      <div className="container">
        <Row>
          <Col md={{ span: 8, offset: 2}}>
            <Tabs fill className="my-5" defaultActiveKey="patient" id="uncontrolled-tab-example" unmountOnExit="True">
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
          </Col>
        </Row>
      </div>
    );
  }
}
export default Login;