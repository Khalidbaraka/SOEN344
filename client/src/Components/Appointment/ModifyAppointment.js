import React, {Component} from 'react';
import axios from 'axios';
/* Import Components */
import AppCalender from './AppCalender';
import { Form, Button, Card, Col, Row } from 'react-bootstrap';
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
            onUpdate: false
        };

        // this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    // Load the selected appointment, set the state of the component of the props.appointment value
    componentDidMount = () => {
        const appointment = this.props.appointment ? this.props.appointment : '';

        console.log("Appointment", appointment);

        const nextState = {
            ...this.state,
            appointment: {
                ...this.state.appointment,
                _id: appointment._id,
                clinic: appointment.clinic,
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


    onSubmit= (e) => {
        // Form submission logic

        e.preventDefault();

        const momentDate = moment(this.state.start,'YYYY-MM-DD HH:mm');
        const updatedAppointment = {
            type: this.state.type,
            momentDate
        };

        axios.post('api/modifyAppointment', {updatedAppointment})

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

        const { onUpdate } = this.state

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

    render() {
        const { appointment, onUpdate } = this.state;

        return (
            <div>
                <h1>Modify Appointment</h1>
                <br/>
                <Card.Body>
                    <Form>

                       <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Select an appointment type</Form.Label>
                            <Form.Control as="select" onChange={this.onAppointmentTypeHandler} value={appointment.type}>
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


                        <Row>
                            <Col>
                                <Form.Group controlId="">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="text" readOnly  value={appointment.type == 0 ? "20" + " min" : "60" + " $"} disabled />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button variant="outline-info" className="float-right my-3" type="submit">
                            Submit
                        </Button>
                </Form>
                </Card.Body>
            </div>

        );

    }}

export default ModifyAppointment;
