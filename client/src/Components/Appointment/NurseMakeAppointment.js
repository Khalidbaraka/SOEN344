import 'rc-calendar/assets/index.css';

import {Alert, Card, Form} from 'react-bootstrap';
import React, {Component} from 'react';

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

    setMessage = (variant, message) => {
        this.setState({
            variant: variant,
            message: message
        })
    }

    render() {

        const {healthCardNumber, variant, message} = this.state;

        return (
            <div className="container">
                { message ?
                    <Alert variant="light" className="mt-4">
                        <h5 style={variant === "success" ? {color: "#F9AA33"} : {color:"#800020"}} className="text-monospace text-center">
                            { message }
                        </h5>
                    </Alert>
                    : ""}
                <h4 className="text-center text-monospace my-4">Make Appointment For A Patient</h4>
                <hr/>

                <Form noValidate className="font-weight-bold">
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Health Card Number</Form.Label>
                        <Form.Control name="healthCardNumber" type="text"
                                      placeholder="Enter Patient's Health Card Number"
                                      value={this.state.healthCardNumber} onChange={this.onChange}/>
                        <Form.Text className="text-muted">
                            ex: DOEJ 9610 3101
                        </Form.Text>
                    </Form.Group>
                </Form>
                <NurseIdentification healthCardNumber={healthCardNumber} setMessage={this.setMessage}/>
            </div>
        );
    }
}

export default NurseMakeAppointment;