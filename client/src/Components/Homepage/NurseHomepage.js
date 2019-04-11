import React, {Component} from 'react';
import PatientNavBar from "../PatientNavBar";
import {Card, Col, ListGroup, Row} from "react-bootstrap";
import {Link, Route, Switch} from "react-router-dom";
import NurseAppointmentsView from "../Appointment/NurseAppointmentView";
import NurseMakeAppointment from '../Appointment/NurseMakeAppointment';

class NurseHomepage extends Component {
    render() {
        return (
            <div className="container">
                <Card className="my-5 shadow p-3 mb-5 bg-white rounded">
                    <Card.Body>
                        <Row>
                            <Col md={3}>
                                <ListGroup variant="flush" className="my-4 text-monospace text-decoration-none font-weight-bold">
                                    <ListGroup.Item className="text-center pb-1"> <h4> MENU </h4> </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Link to='/homepage/nurse/ViewAppointments' className="secondary-color text-decoration-none">
                                            View Appointments
                                        </Link>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Link to='/homepage/nurse/scheduleAppointment' className="secondary-color text-decoration-none text-nowrap">
                                            Schedule an Appointment
                                        </Link>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>

                            <Col md={9}>
                                <Switch>
                                    <Route path='/homepage/nurse/ViewAppointments' component={NurseAppointmentsView}/>
                                    <Route path='/homepage/nurse/ScheduleAppointment' component={NurseMakeAppointment}/>
                                </Switch>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default NurseHomepage;