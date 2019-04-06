import {Alert, Col, Row, Tab, Tabs} from 'react-bootstrap';
import React, { Component } from 'react';

import DoctorLogin from './DoctorLogin';
import NurseLogin from './NurseLogin';
import PatientLogin from './PatientLogin';

class Login extends Component{
  constructor(props) {
    super(props);

    this.state = {
      tab: '',
      message: '',
    }
  }

  componentDidMount = () => {
    const { tab, message } = this.props.location.state ? this.props.location.state : '';

    if (tab) {
      this.setState({
        tab: tab
      })
    } else {
      this.setState({
        tab: "patient"
      })
    }

    if (message) {
      this.setState({
        message: message
      })
    }
  };

  updateMessage = (message) => {
    this.setState({
      message: message
    })
  };
  
  render() {

    const { tab, message } = this.state;

    return (
      <div className="container">
        <Row>
          <Col md={{ span: 8, offset: 2}}>

            { message ?
                <Alert variant="light" className="mt-4">
                  <h5 style={{color: "#800020"}} className="text-monospace text-center">{ message }</h5>
                </Alert>
                : ''}
            <Tabs 
              fill 
              className="shadow bg-white rounded mt-5"
              activeKey={ tab } 
              onSelect={ tab => this.setState({ tab }) }
              id="uncontrolled-tab-example" unmountOnExit="True">
              <Tab eventKey="doctor" title="Doctor">
                <DoctorLogin fromPath = {this.props.location.state} updateMessage={this.updateMessage} />
              </Tab>
              <Tab eventKey="nurse" title="Nurse">
                <NurseLogin fromPath = {this.props.location.state} updateMessage={this.updateMessage}/>
              </Tab>
              <Tab eventKey="patient" title="Patient">
                <PatientLogin fromPath = {this.props.location.state} updateMessage={this.updateMessage} />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Login;