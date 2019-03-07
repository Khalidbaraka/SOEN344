import {Col, Row, Tab, Tabs} from 'react-bootstrap';
import React, { Component } from 'react';

import DoctorLogin from './DoctorLogin';
import NurseLogin from './NurseLogin';
import PatientLogin from './PatientLogin';

class Login extends Component{
  constructor(props) {
    super(props);

    this.state = {
      tab: ''
    }
  }

  componentDidMount = () => {
    const tab = this.props.location.state ? this.props.location.state.tab : '';
    
    if (tab) {
      this.setState({
        tab: tab
      })
    } else {
      this.setState({
        tab: "patient"
      })
    }
  }
  
  render() {
    const { tab } = this.state    

    return (
      <div className="container">
        <Row>
          <Col md={{ span: 8, offset: 2}}>
            <Tabs 
              fill 
              className="mt-5" 
              activeKey={ tab } 
              onSelect={ tab => this.setState({ tab }) }
              id="uncontrolled-tab-example" unmountOnExit="True">
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