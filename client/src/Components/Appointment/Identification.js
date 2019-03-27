import 'rc-calendar/assets/index.css';

import { Button, Card, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import React, { Component } from 'react';

import AppCalender from './AppCalender';
import { Redirect } from 'react-router-dom'
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
            message: '',
            variant: '',
            redirectToCart: false
        };
        return initialState;
    }

    setTimeout = (() => {
        window.location.reload(true);
    }, 3000);

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
        const { appointmentType, startTime } = this.state;

        const user = JSON.parse(localStorage.getItem('userToken'));
        const healthCardNumber = encodeURI(user.healthCardNumber);

        axios.post('/api/patients/' + healthCardNumber + '/cart/save', {
            type: appointmentType,
            startTime: startTime,
            endTime: startTime
        }).then(res => {
            if (res) {
                this.setState({
                    message: "Appointment successfully added", 
                    variant: "success"
                });

                setTimeout(function() {
                    window.location.reload();
                }, 3000);
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
                })
            }  
        });
    }

    handleRedirectToCart = () => {
        
        this.setState({
            redirectToCart: true
        })
    }
    
    render() {        
        const { appointmentType, startTime, message, variant, redirectToCart } = this.state;

        if (redirectToCart) {
            //direct to nurse homepage
            return <Redirect to = '/cart' /> ;
        }

        return (
            <div className="container">
                { message ? 
                    <Card border={variant} className="text-center my-4"> 
                        <Card.Body> 
                            <Card.Title className="text-monospace"> { message }
                                { variant == "success" ? (
                                    <Button variant="outline-info" className="mx-4" onClick={this.handleRedirectToCart}> Go to Cart</Button>
                                ):''}
                            </Card.Title>
                        </Card.Body> 
                    </Card>
                : ''}
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
                            type={appointmentType}
                            startTime={startTime}
                            onChange={this.onChange}
                            disabledHours={this.disabledHours}
                            disabledMinutes={this.disabledMinutes}
                            disabledSeconds={this.disabledSeconds}
                            disabledDate={this.disabledDate}
                            onSubmit={this.onSubmit} />  
                        <hr/>
                        <Button variant="outline-info float-right" onClick={this.onSubmit}> Proceed </Button>
                    </Card.Body>
                    
                </Card>
            </div>
        );
    }
}

export default Identification;