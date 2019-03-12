import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import React, { Component } from 'react';

import AppCalender from './AppCalender';
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

    componentDidMount = () => {
        const appointment = this.props.appointment ? this.props.appointment : '';

        console.log("Appointment", appointment);
        
        // this.setState({
        //     appointment: appointment, 
        //     startTime: moment(appointment.start), 
        //     type: appointment.type
        // });

        const nextState = {
            ...this.state.appointment,
            appointment: {
                _id: appointment._id,
                clinic: appointment.clinic,
                doctor: appointment.doctor,
                duration: appointment.duration,
                end: appointment.end,
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
        
        if (this.state.appointment.start.toDate().getHours() == 0) {
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
            ...this.state.appointment,
            appointment: {
                start: value
            }
        };
        
        this.setState(nextState);           
    }

    onAppointmentTypeHandler = (event) => {
        
        const nextState = {
            ...this.state.appointment,
            appointment: {
                type: event.target.value
            }
        };

        this.setState(nextState);
    }

    onUpdateTimeHandler = () => {

        const { onUpdate } = this.state

        const nextState = ({
            ...this.state,
            onUpdate: !onUpdate
        });

        this.setState(nextState);
    }
    
    render() {
        const { appointment, onUpdate } = this.state;
        return (
            <div>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="">
                            <Form.Label>Clinic</Form.Label>
                            <Form.Control type="text" value={appointment.clinic} disabled />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="">
                            <Form.Label>Doctor</Form.Label>
                            <Form.Control type="text" value={appointment.doctor} disabled />
                        </Form.Group>

                        <Form.Group controlId="">
                            <Form.Label>Room</Form.Label>
                            <Form.Control type="text" value={appointment.room} disabled />
                        </Form.Group>

                        <Form.Group controlId="">
                            <Form.Label>Type</Form.Label>
                            <Form.Control as="select" value={appointment.type}>
                                <option value="0"> Walk-in </option>
                                <option value="1"> Annual </option>
                            </Form.Control>
                        </Form.Group>

                        { onUpdate == false ? (
                            <Form.Group controlId="">
                                <Form.Label>Start time</Form.Label>
                                <Form.Control type="text" value={appointment.start.toString()} onClick={this.onUpdateTimeHandler} />
                            </Form.Group>
                        ) : (
                            <div>
                                <hr/>
                                    <AppCalender
                                        disabledHours = {this.disabledHours}
                                        disabledMinutes = {this.disabledMinutes}
                                        disabledSeconds = {this.disabledSeconds}
                                        disabledDate = {this.disabledDate}
                                        onChange = {this.onChange}
                                        startTime = {appointment.start}
                                        type = {appointment.type}
                                    />
                                <hr/>
                            </div>
                        )}

                        <Form.Group controlId="">
                            <Form.Label>End time</Form.Label>
                            <Form.Control type="text" value={appointment.end.toString()} disabled />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group controlId="">
                                    <Form.Label>Duration</Form.Label>
                                    <Form.Control type="text" value={appointment.duration + " min"} disabled />
                                </Form.Group>
                            </Col>
    
                            <Col>
                                <Form.Group controlId="">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="text" value={appointment.price + " $"} disabled />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button variant="outline-info" className="float-right" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </div>
        );
    }
}

export default ModifyAppointment;