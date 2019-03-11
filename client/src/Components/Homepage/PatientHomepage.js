import { Col, ListGroup, Row } from 'react-bootstrap';
import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";

import Identification from '../Appointment/Identification';
import AppointmentsView from '../Appointment/MyAppointment';

import { Link } from 'react-router-dom'

class PatientHomepage extends Component {

    constructor(props) {
        super(props);
     
    }

    render() {
        return (
            <div className="container">
                <Row>
                    <Col md={3}>
                        <ListGroup variant="flush"className="my-5 text-monospace">
                            <ListGroup.Item> Menu </ListGroup.Item>
                            <ListGroup.Item><Link to='/homepage/patient/myAppointment'> MyAppointment </Link></ListGroup.Item>
                            <ListGroup.Item><Link to='/homepage/patient/scheduleAppointment'> Schedule an Appointment </Link></ListGroup.Item>
                        </ListGroup>
                    </Col>
                

                    <Col md={9}>
                        <Switch>
                            <Route path='/homepage/patient/myAppointment' component={AppointmentsView}/>
                            <Route path='/homepage/patient/scheduleAppointment' component={ Identification }/>
                        </Switch>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PatientHomepage;