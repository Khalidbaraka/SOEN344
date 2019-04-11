import 'rc-calendar/assets/index.css';

import {Alert, Button, Card, Col, Form, InputGroup, Row} from 'react-bootstrap';
import React, {Component} from 'react';

import AppointmentList from './AppointmentList';
import ModifyAppointment from './ModifyAppointment';
import axios from 'axios';
import {Link} from "react-router-dom";

class NurseAppointment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appointments: [],
            healthCardNumber: "",
            message: "",
            onShow: false,
            toUpdate: false,
            variant: '',
        }
    }

    getAppointments = (healthCardNumber) => {

        let nurse = JSON.parse(localStorage.getItem('userToken'));

        axios.get(`/api/patients/${healthCardNumber}/${nurse.clinic}/appointment/get`)
            .then(res => {
                if (res.data) {
                    console.log(res.data.message);
                    this.setState({
                        appointments: res.data
                    })
                }
            })
            .catch(err => console.log(err))
    }

    deleteItem = (id) => {

        let string = localStorage.getItem('userToken');
        let jsonToken = JSON.parse(string);

        const {healthCardNumber} = this.state

        axios.delete(`/api/patients/${healthCardNumber}/appointment/${id}/delete`)
            .then(res => {
                if (res.data.success) {
                    const nextState = {
                        ...this.state,
                        onShow: true
                    }

                    this.setState(nextState);
                }
            }).catch(err => console.log(err))

        window.location.reload();
    }

    onChange = (e) => {
        this.setState({
            healthCardNumber: e.target.value,
        })
    }

    onUpdateAppointment = (appointment) => {

        console.log("Appointment on Update", appointment);

        this.setState({
            toUpdate: true,
            appointment: appointment,
            message: ''
        });
    }

    onReturn = () => {
        const nextState = {
            ...this.state,
            toUpdate: false
        }

        this.setState(nextState);
    }

    onReset = (message, variant, toUpdate) => {
        this.setState({
            toUpdate: toUpdate,
            message: message,
            variant: variant
        })

        this.getAppointments(this.state.healthCardNumber);
    }

    onSubmit = (event) => {

        event.preventDefault();

        const nextState = {
            ...this.state,
            appointments: [],
            onShow: true
        }

        this.setState(nextState);

        this.getAppointments(this.state.healthCardNumber);
    }


    renderFields = () => {
        if (!this.state.toUpdate) {
            if (this.state.onShow === true) {
                return (
                    <AppointmentList
                        appointments={this.state.appointments}
                        onUpdateAppointment={this.onUpdateAppointment}
                        toUpdate={this.state.toUpdate}
                        deleteItem={this.deleteItem}
                    />
                )
            }
        } else {
            return (
                <div>
                    <Row>
                        <Col md={1}>
                            <Button size="sm" variant="outline-info" onClick={this.onReturn.bind(this)}> <i className="fa fa-chevron-left" aria-hidden="true"></i> </Button>
                        </Col>
                        <Col md={11}>
                            <h5 className="text-monospace">Modify the Appointment</h5>
                        </Col>
                    </Row>

                    <ModifyAppointment
                        healthCardNumber={this.state.healthCardNumber}
                        appointment={this.state.appointment}
                        onReset={this.onReset}/>
                </div>
            )
        }
    }

    render() {

        const {message, variant} = this.state;

        return (
            <div className="container">

                { message ?
                    <Alert variant="light" className="mt-4">
                        <h5 style={variant === "success" ? {color: "#F9AA33"} : {color:"#800020"}} className="text-monospace text-center">
                            { message }
                        </h5>
                    </Alert>
                    : ''}

                <h4 className="text-center text-monospace my-4">Search Appointments</h4>
                <hr/>

                <Form noValidate className="font-weight-bold my-5" onSubmit={this.onSubmit}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Health Card Number</Form.Label>
                        <InputGroup>
                            <Form.Control name="healthCardNumber" type="text"
                                          placeholder="Enter Patient's Health Card Number"
                                          value={this.state.healthCardNumber} onChange={this.onChange}/>
                            <InputGroup.Append>
                                <Button variant="outline-info" type="submit" className="float-right">
                                    Search
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <Form.Text className="text-muted">
                            ex: DOEJ 9610 3101
                        </Form.Text>
                    </Form.Group>
                </Form>

                {this.renderFields()}
            </div>
        );
    }
}

export default NurseAppointment;