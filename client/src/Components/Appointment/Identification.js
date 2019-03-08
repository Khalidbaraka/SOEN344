import 'rc-calendar/assets/index.css';

import { Button, Card, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import React, { Component } from 'react';

import AppCalender from './AppCalender';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

class Identification extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            appointmentType: "0", 
            startTime: moment().startOf('day'),
            onProceed: false
        }
    }
    
    // Selecting the appointment type
    onAppointmentTypeHandler = (event) => {
        this.setState({
            appointmentType: event.target.value
        })

        this.resetSelection();
    }

    // Restrict the calendar hours from 8am to 8pm
    disabledHours = () => {
        return [0, 1, 2, 3, 4, 5, 6, 7, 21, 22, 23];
    }

    // Disable seconds, as a timeslot is a block of 20 min
    disabledSeconds = (h, m) => {
        const arraySeconds = [];
        let i = 0;
        while (i <= 60) {
            arraySeconds.push(i);
            i++;
        };

        return arraySeconds;
    }

    // Select a date and time handler
    onDateSelectionHandler = (value) => {       
        console.log("Moment", value.toDate());
        
        const nextState = {
            ...this.state,
            startTime: value
        };
        
        this.setState(nextState);           
    }

    // Reset the date and time. Also reset after choosing an appointment type
    resetSelection = () => {
        this.setState({
            startTime: moment().startOf('day')
        });
    }

    onSubmit = (event) => {
        event.preventDefault();

        const searchQuery = {
            type: this.state.appointmentType,
            startTime: this.state.startTime.toDate()
        };

        this.setState({
            onProceed: true
        });

        console.log("Search Query: ", searchQuery);
        
    }

    
    render() {        
        const { appointmentType, startTime, onProceed } = this.state;

        if (onProceed) {
            return <Redirect to={{
                pathname:"/homepage/patient/scheduleAppointment/list",
                state: {
                    appointmentType: this.state.appointmentType,
                    startTime: this.state.startTime
                }
            }}/>;
        }
        
        return (
            <div className="container">
                <Card className="my-5">
                    <Card.Header>
                        <Card.Title className="text-center text-monospace">Identification</Card.Title>
                    </Card.Header>

                    <Card.Body>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Select an appointment type</Form.Label>
                                    <Form.Control as="select" onChange={this.onAppointmentTypeHandler} value={appointmentType}>
                                        <option value="0"> Walk-in </option>
                                        <option value="1"> Annual </option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <hr/>
                            <AppCalender 
                                type={appointmentType}
                                startTime={startTime}
                                disabledHours={this.disabledHours}
                                disabledSeconds={this.disabledSeconds}
                                onDateSelectionHandler={this.onDateSelectionHandler}
                                resetSelection={this.resetSelection}
                            />  
                            <hr/>
                            <Button variant="outline-info float-right" type="submit"> Proceed </Button>
                        </Form>

                    </Card.Body>
                    
                </Card>
            </div>
        );
    }
}

export default Identification;