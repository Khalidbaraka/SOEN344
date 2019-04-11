import 'rc-calendar/assets/index.css';

import {Alert, Button, Card, Col, Dropdown, DropdownButton, Form, Row} from 'react-bootstrap';
import React, {Component} from 'react';

import AppCalender from './AppCalender';
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';

class NurseIdentification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            healthCardNumber: this.props.healthCardNumber,
            appointmentType: "0",
            startTime: moment().startOf('day')
        }
    }

    onAppointmentTypeHandler = (event) => {
        this.setState({
            appointmentType: event.target.value,
            startTime: moment().startOf('day')
        })
    }

    disabledHours = () => {
        return [0, 1, 2, 3, 4, 5, 6, 7, 21, 22, 23];
    }

    disabledMinutes = () => {
        if (this.state.startTime.toDate().getHours() == 0) {
            return [0, 20, 40];
        }
    }

    disabledSeconds = (h, m) => {
        const arraySeconds = [];
        let i = 0;
        while (i <= 60) {
            arraySeconds.push(i);
            i++;
        }

        return arraySeconds
    }

    disabledDate = (current) => {
        const date = new Date();

        // Can not select days before today
        return current.isBefore(date.setDate(date.getDate() - 1));
    }

    onChange = (value) => {
        console.log("Moment", value.toDate());

        const nextState = {
            ...this.state,
            startTime: value
        };

        this.setState(nextState);
    }

    onSubmit = (event) => {
        event.preventDefault();

        const {appointmentType, startTime} = this.state;
        const nurse = JSON.parse(localStorage.getItem('userToken'));
        let { message, variant } = "";

        axios.post(`/api/nurses/${nurse.accessID}/${this.props.healthCardNumber}/${nurse.clinic}/appointment/create`, {
            type: appointmentType,
            startTime: startTime,
            endTime: startTime
        }).then(res => {
            if (res) {
                message = "Appointment successfully added";
                variant = "success";

                this.props.setMessage(variant, message);
            }
        }).catch((error) => {
            // Error
            if (error.response) {
                message = error.response.data.message;
                variant = "danger";

                this.props.setMessage(variant, message);

                this.setState({
                    appointmentType: "0",
                    startTime: moment().startOf('day')
                })
            }
        });
    }

    render() {

        const {appointmentType, startTime} = this.state;

        return (
            <div>
                <hr/>
                <Form className="my-4">
                    <Form.Group as={Row} controlId="formGridState" noGutters>
                        <Form.Label column md="4" className="font-weight-bold">Select an appointment type</Form.Label>
                        <Col md={8}>
                            <Form.Control as="select" onChange={this.onAppointmentTypeHandler} value={appointmentType}>
                                <option value="0"> Walk-in</option>
                                <option value="1"> Annual</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Form>
                <hr/>
                <AppCalender
                    type={appointmentType}
                    startTime={startTime}
                    onChange={this.onChange}
                    disabledHours={this.disabledHours}
                    disabledMinutes={this.disabledMinutes}
                    disabledSeconds={this.disabledSeconds}
                    disabledDate={this.disabledDate}
                    onSubmit={this.onSubmit}/>
                <hr/>
                <Button variant="outline-info float-right" onClick={this.onSubmit}> Proceed </Button>

            </div>
        );
    }
}

export default NurseIdentification;