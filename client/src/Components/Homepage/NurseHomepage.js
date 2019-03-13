import React, { Component } from 'react';
import PatientNavBar from "../PatientNavBar";
import {Col, ListGroup, Row} from "react-bootstrap";
import {Link, Route, Switch} from "react-router-dom";
import NurseAppointmentsView from "../Appointment/NurseAppointmentView";
import NurseMakeAppointment from '../Appointment/NurseMakeAppointment';

class NurseHomepage extends Component {
    render() {
        return (
            <div className="container">
                <Row>
                    <Col md={3}>
                        <ListGroup variant="flush"className="my-5 text-monospace">
                            <ListGroup.Item> Menu </ListGroup.Item>
                            <ListGroup.Item><Link to='/homepage/nurse/ViewAppointments'> View Appointments </Link></ListGroup.Item>
                            <ListGroup.Item><Link to='/homepage/nurse/scheduleAppointment'> Schedule an Appointment </Link></ListGroup.Item>
                        </ListGroup>
                    </Col>


                    <Col md={9}>
                        <Switch>
                            <Route path='/homepage/nurse/ViewAppointments' component={NurseAppointmentsView}/>
                            <Route path='/homepage/nurse/ScheduleAppointment' component={ NurseMakeAppointment }/>
                        </Switch>
                    </Col>
                </Row>
            </div>



    );
    }
}

export default NurseHomepage;