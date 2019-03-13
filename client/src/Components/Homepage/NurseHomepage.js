import React, { Component } from 'react';
import PatientNavBar from "../PatientNavBar";
import {Col, ListGroup, Row} from "react-bootstrap";
import {Link, Route, Switch} from "react-router-dom";
import NurseAppointmentsView from "../Appointment/NurseAppointmentView";

class NurseHomepage extends Component {
    render() {
        return (
            <div className="container">
                <Row>
                    <Col md={3}>
                        <ListGroup variant="flush"className="my-5 text-monospace">
                            <ListGroup.Item> Menu </ListGroup.Item>
                            <ListGroup.Item><Link to='/homepage/nurse/ViewAppointments'> View Appointments </Link></ListGroup.Item>
                        </ListGroup>
                    </Col>


                    <Col md={9}>
                        <Switch>
                            <Route path='/homepage/nurse/ViewAppointments' component={NurseAppointmentsView}/>
                        </Switch>
                    </Col>
                </Row>
            </div>



    );
    }
}

export default NurseHomepage;