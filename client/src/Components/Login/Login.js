import {Alert, Col, Row, Tab, Tabs, Nav} from 'react-bootstrap';
import React, {Component} from 'react';

import DoctorLogin from './DoctorLogin';
import NurseLogin from './NurseLogin';
import PatientLogin from './PatientLogin';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: '',
            message: '',
        }
    }

    componentDidMount = () => {
        const {tab, message} = this.props.location.state ? this.props.location.state : '';

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

        const {tab, message} = this.state;

        return (
            <div className="container">
                {message ?
                    <Alert variant="light" className="mt-4">
                        <h5 style={{color: "#800020"}} className="text-monospace text-center">{message}</h5>
                    </Alert>
                    : ''}

                <Tab.Container activeKey={tab}
                               onSelect={tab => this.setState({tab})}
                >
                    <Row>
                        <Col md={3} className="my-5">
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="patient" className="primary-color lead font-weight-bold">Patient</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="doctor" className="primary-color lead font-weight-bold">Doctor</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="nurse" className="primary-color lead font-weight-bold">Nurse</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col md={9}>
                            <Tab.Content className="shadow bg-white rounded my-5">
                                <Tab.Pane eventKey="patient">
                                    <PatientLogin fromPath={this.props.location.state}
                                                  updateMessage={this.updateMessage}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="doctor">
                                    <DoctorLogin fromPath={this.props.location.state}
                                                 updateMessage={this.updateMessage}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="nurse">
                                    <NurseLogin fromPath={this.props.location.state}
                                                updateMessage={this.updateMessage}/>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>

            </div>
        );
    }
}

export default Login;