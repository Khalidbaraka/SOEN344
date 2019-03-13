import 'rc-calendar/assets/index.css';

import { Button, Card, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import React, { Component } from 'react';
import AppointmentList from './AppointmentList';
import axios from 'axios';
import moment from "./Identification";




class MyAppointment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appointments: [],
            healthCardNumber: "",
            message: ""
        }
    }

    componentDidMount() {
        this.getAppointments();
    }

    getAppointments (healthCardNumber) {

        axios.get('/api/patients/'+ healthCardNumber+ '/appointment/get')
            .then(res => {
                if(res.data){
                    console.log(res.data);
                    console.log(res.data.message);
                    this.setState({
                        appointments: res.data,
                        message: res.data.message
                    })
                }
            })
            .catch(err => console.log(err))
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (event) => {

        event.preventDefault();
        this.setState({
            appointments: []
        });
        console.log(this.state.healthCardNumber);
        this.getAppointments(this.state.healthCardNumber);
    }


    render() {

        const { appointments,message} = this.state;
        return (
            <div className="container">

                <Card className="my-5">
                    <Card.Header>
                        <Card.Title className="text-center text-monospace">Search Appointments</Card.Title>
                    </Card.Header>
                    <Card.Body>
                    <Form noValidate className="font-weight-bold">
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Health Card Number</Form.Label>
                            <Form.Control name="healthCardNumber" type="text" placeholder="Enter Patient's Health Card Number" value = {this.state.healthCardNumber} onChange={this.onChange}/>
                            <Form.Text className="text-muted">
                                ex: DOEJ 9610 3101
                            </Form.Text>
                        </Form.Group>
                    </Form>
                    <AppointmentList appointments={appointments} />
                        <Button variant="outline-info" type="button" onClick={this.onSubmit} className="float-right mt-3">
                            Search
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default MyAppointment;