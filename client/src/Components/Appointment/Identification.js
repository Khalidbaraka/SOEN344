import 'rc-calendar/assets/index.css';

import { Button, Card, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import React, { Component } from 'react';

import AppCalender from './AppCalender';

class Identification extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            appointmentType: "Walk-in"
        }
    }

    onAppointmentTypeHandler = (event) => {
        this.setState({
            appointmentType: event.target.value
        })
    }
    
    render() {        
        const { appointmentType } = this.state;

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
                                        <option value="Walk-in"> Walk-in </option>
                                        <option value="Annual"> Annual </option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                        <hr/>
                        <AppCalender type={appointmentType} />  
                        <hr/>
                        <Button variant="outline-info float-right"> Proceed </Button>
                    </Card.Body>
                    
                </Card>
            </div>
        );
    }
}

export default Identification;