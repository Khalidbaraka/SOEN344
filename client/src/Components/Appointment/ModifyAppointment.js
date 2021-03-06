import {Button, Card, Col, Form, Row} from 'react-bootstrap';
import React, {Component} from 'react';

import AppCalender from './AppCalender';
import axios from 'axios';
import moment from 'moment';

class ModifyAppointment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appointment: {
                _id: '',
                clinic: '',
                doctor: '',
                duration: '',
                end: '',
                price: '',
                room: '',
                start: '',
                type: ''
            },
            onUpdate: false,
        }
    }

    // Load the selected appointment, set the state of the component of the props.appointment value
    componentDidMount = () => {
        const appointment = this.props.appointment ? this.props.appointment : '';
        let clinic = {}

        // Get the clinic information by its id. Required for patient and nurse.
        axios.get(`/api/clinic/${appointment.clinic}/get`)
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        ...this.state,
                        appointment: {
                            ...this.state.appointment,
                            clinic: res.data.clinic
                        }
                    })
                }
            }).catch(error => {
                console.log(error);
        });

        const nextState = {
            ...this.state,
            appointment: {
                ...this.state.appointment,
                _id: appointment._id,
                doctor: appointment.doctor,
                duration: appointment.duration,
                end: moment(appointment.end),
                price: appointment.price,
                room: appointment.room,
                start: moment(appointment.start),
                type: appointment.type
            }
        };

        this.setState(nextState);
    }

    disabledHours = () => {
        return [0, 1, 2, 3, 4, 5, 6, 7, 21, 22, 23];
    }

    disabledMinutes = () => {

        if (this.state.appointment.start.toDate().getHours() === 0) {
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
            appointment: {
                ...this.state.appointment,
                start: value
            }
        };
        this.setState(nextState);
    }

    // Handler for selecting the type of appointment
    onAppointmentTypeHandler = (event) => {

        const nextState = {
            ...this.state,
            appointment: {
                ...this.state.appointment,
                type: event.target.value,
                start: moment().startOf('day')
            }
        };
        this.setState(nextState);
    }

    // Once the patient select the start time to update, the Calendar is displayed and the end time is removed.
    onUpdateTimeHandler = () => {

        const {onUpdate} = this.state

        const nextState = ({
            ...this.state,
            onUpdate: !onUpdate,
            appointment: {
                ...this.state.appointment,
                end: ''
            }
        });

        this.setState(nextState);
    }


    onSubmit = (e) => {
        e.preventDefault();

        const appointmentToUpdate = {
            appointmentId: this.state.appointment._id,
            type: this.state.appointment.type,
            startTime: this.state.appointment.start
        };

        const user = JSON.parse(localStorage.getItem('userToken'));
        const clinic = JSON.parse(localStorage.getItem('clinic'));
        let healthCardNumber;
        let clinicID;

        // Depending on the user; a patient or nurse.
        if (this.props.healthCardNumber) {
            healthCardNumber = this.props.healthCardNumber;
            clinicID = user.clinic;
        } else {
            healthCardNumber = encodeURI(user.healthCardNumber);
            clinicID = clinic._id;
        }

        console.log("user", user);

        axios.put(`/api/patients/${healthCardNumber}/${clinicID}/appointment/update`, {
            appointmentId: appointmentToUpdate.appointmentId,
            type: appointmentToUpdate.type,
            startTime: appointmentToUpdate.startTime
        })
            .then(res => {
                if (res.data.success) {
                    let message = res.data.message;
                    let variant = 'success';
                    let toUpdate = false;

                    this.props.onReset(message, variant, toUpdate);
                }
            }).catch((error) => {
            if (error.response) {
                let message = error.response.data.message;
                let variant = 'danger';
                let toUpdate = true;

                this.props.onReset(message, variant, toUpdate);
            }
        });

    }

    render() {
        const {appointment, onUpdate} = this.state;

        return (
            <div className="py-4 font-weight-bold">
                <Form>
                    <Form.Group controlId="">
                        <Form.Label>Clinic</Form.Label>
                        <Form.Control type="text" readOnly value={appointment.clinic.name} disabled/>
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label>Doctor</Form.Label>
                                <Form.Control type="text" readOnly value={appointment.doctor} disabled/>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="">
                                <Form.Label>Room</Form.Label>
                                <Form.Control type="text" value={appointment.room} disabled/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="formGridState">
                        <Form.Label>Select an appointment type</Form.Label>
                        <Form.Control as="select" onChange={this.onAppointmentTypeHandler} value={appointment.type}>
                            <option value="0"> Walk-in</option>
                            <option value="1"> Annual</option>
                        </Form.Control>
                    </Form.Group>

                    {onUpdate === false ? (
                        <Form.Group controlId="">
                            <Form.Label>Start time</Form.Label>
                            <Form.Control type="text" value={appointment.start.toString()} onClick={this.onUpdateTimeHandler}/>
                        </Form.Group>
                    ) : (
                        <div>
                            <hr/>
                            <AppCalender
                                disabledHours={this.disabledHours}
                                disabledMinutes={this.disabledMinutes}
                                disabledSeconds={this.disabledSeconds}
                                disabledDate={this.disabledDate}
                                onChange={this.onChange}
                                startTime={appointment.start}
                                type={appointment.type}
                            />
                            <hr/>
                        </div>
                    )}

                    <Form.Group controlId="">
                        <Form.Label>End time</Form.Label>
                        <Form.Control type="text" readOnly value={appointment.end.toString()} disabled/>
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label>Duration</Form.Label>
                                <Form.Control type="text" readOnly value={appointment.type === 0 ? "20 min" : "60 min"}
                                              disabled/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="text" readOnly value={appointment.type === 0 ? "20 $" : "60 $"}
                                              disabled/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button variant="outline-info" className="float-right my-3" type="button" onClick={this.onSubmit}>
                        Proceed
                    </Button>
                </Form>
            </div>

        );

    }
}

export default ModifyAppointment;
