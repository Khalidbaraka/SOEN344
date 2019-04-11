import 'rc-calendar/assets/index.css';

import {Alert, Button, Col, Form, Row, Modal} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, {Component} from 'react';

import AppCalender from './AppCalender';
import axios from 'axios';
import moment from 'moment';

class Identification extends Component {
    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }

    getInitialState = () => {
        const initialState = {
            appointmentType: "0",
            startTime: moment().startOf('day'),
            clinic: '',
            message: '',
            variant: '',
        };
        return initialState;
    }

    componentDidMount = () => {
        const clinic = JSON.parse(localStorage.getItem('Clinic'));

        this.setState({
            ...this.state,
            clinic: clinic
        });
    }

    onAppointmentTypeHandler = (event) => {

        this.setState({
            appointmentType: event.target.value,
            startTime: moment().startOf('day')
        })
    }

    resetState = () => {
        this.setState(this.getInitialState());
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

        const user = JSON.parse(localStorage.getItem('userToken'));
        const clinic = JSON.parse(localStorage.getItem('clinic'));

        axios.post(`/api/patients/${user.healthCardNumber}/${clinic._id}/cart/save`, {
            type: appointmentType,
            startTime: startTime,
            endTime: startTime
        }).then(res => {
            if (res) {
                this.setState({
                    message: "Appointment successfully added!",
                    variant: "success"
                });
            }
        }).catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                this.setState({
                    message: error.response.data.message,
                    variant: "danger",
                    appointmentType: "0",
                    startTime: moment().startOf('day')
                });
            }
        });
    }

    handleClose = () => {
        const nextState = this.getInitialState();
        this.setState(nextState);
    }

    render() {
        const {appointmentType, startTime, message, variant} = this.state;

        return (
            <div>
                <Modal show={message ? message : ''} onHide={this.handleClose}>
                    <Modal.Body closeButton>
                        <Alert variant="light" className="mt-4">
                            <h5 style={variant === "success" ? {color: "#F9AA33"} : {color:"#800020"}} className="text-monospace text-center">
                                <div>{ message }  </div>
                                {variant === "success" ? (
                                    <Link className="secondary-color text-decoration-none mx-4 font-weight-bold"
                                          to="/cart"> Go to Cart ? </Link>
                                ) : ''}
                            </h5>
                        </Alert>
                    </Modal.Body>
                </Modal>

                <h4 className="text-center text-monospace my-4">Identification</h4>
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

export default Identification;