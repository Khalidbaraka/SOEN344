import 'rc-calendar/assets/index.css';

import { Button, Card, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import React, { Component } from 'react';

import AppCalender from './AppCalender';
import moment from 'moment';

class Identification extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
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
    
    render() {        
        const { appointmentType, startTime } = this.state;

        return (
            <div className="container">
                <Card className="my-5">
                    <Card.Header>
                        <Card.Title className="text-center text-monospace">Identification</Card.Title>
                    </Card.Header>

                    <Card.Body>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Select an appointment type</Form.Label>
                                    <Form.Control as="select" onChange={this.onAppointmentTypeHandler} value={appointmentType}>
                                        <option value="0"> Walk-in </option>
                                        <option value="1"> Annual </option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                        <hr/>
                        <AppCalender 
                            type = {appointmentType}
                            startTime = {startTime}
                            disabledHours = {this.disabledHours}
                            disabledMinutes = {this.disabledMinutes}
                            disabledSeconds = {this.disabledSeconds}
                            disabledDate = {this.disabledDate}
                            onChange = {this.onChange}
                         />  
                        <hr/>
                        <Button variant="outline-info float-right"> Proceed </Button>
                    </Card.Body>
                    
                </Card>
            </div>
        );
    }
}

export default Identification;