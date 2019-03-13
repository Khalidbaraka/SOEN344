import 'rc-calendar/assets/index.css';

import { Card, Form} from 'react-bootstrap';
import React, { Component } from 'react';
import NurseIdentification from './NurseIdentification'
import moment from 'moment';

class NurseMakeAppointment extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            healthCardNumber: '',
            appointmentType: "0", 
            startTime: moment().startOf('day'),
            message: '',
            variant: '', 
            redirectToAppointments: false
        }

    }
    onChange = (e) => {
        this.setState({
            healthCardNumber: e.target.value
        })
    }

    render() {

        const { healthCardNumber,message} = this.state;
        return (
            <div className="container">

                <Card className="my-5">
                    <Card.Header>
                        <Card.Title className="text-center text-monospace">Make Appointment For A Patient</Card.Title>
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
                    <NurseIdentification healthCardNumber={healthCardNumber} />
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default NurseMakeAppointment;