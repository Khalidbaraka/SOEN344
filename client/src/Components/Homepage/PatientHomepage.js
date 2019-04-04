import {Col, ListGroup, Row, Card} from 'react-bootstrap';
import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";

import AppointmentsView from '../Appointment/MyAppointment';
import Identification from '../Appointment/Identification';
import {Link} from 'react-router-dom'

class PatientHomepage extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="container">
                <Card className="my-5 shadow p-3 mb-5 bg-white rounded">
                    <Card.Body>
                        <Row>
                            <Col md={3}>
                                <ListGroup variant="flush" className="my-4 text-monospace text-decoration-none">
                                    <ListGroup.Item className="text-center"> <h4> MENU </h4> </ListGroup.Item>
                                    <ListGroup.Item><Link to='/homepage/patient/myAppointment' className="text-info text-decoration-none"> My
                                        Appointment </Link></ListGroup.Item>
                                    <ListGroup.Item><Link to='/homepage/patient/scheduleAppointment' className="text-info text-decoration-none text-nowrap"> Schedule an
                                        Appointment </Link></ListGroup.Item>
                                </ListGroup>
                            </Col>


                            <Col md={9}>
                                <Switch>
                                    <Route path='/homepage/patient/myAppointment' component={AppointmentsView}/>
                                    <Route path='/homepage/patient/scheduleAppointment' component={Identification}/>
                                </Switch>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default PatientHomepage;