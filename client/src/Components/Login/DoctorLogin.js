import { Button, Card, Form } from 'react-bootstrap';
import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import axios from 'axios';

const jwt = require('jsonwebtoken');

class DoctorLogin extends Component{

    constructor() {
        super();

        this.state = {
            permitNumber: '',
            password: '',
            message: '',
            isAuthenticated: false
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //go to home page after submitting 
    onSubmit = (e) => {
        e.preventDefault();

        const doctor = {
            permitNumber: this.state.permitNumber,
            password: this.state.password
        };

        axios.post('api/doctors/login', {
                permitNumber: doctor.permitNumber,
                password: doctor.password
            })
            .then(res => {
                if (res.data.success) {
                    const decoded = jwt.decode(res.data.token, {
                        complete: true
                    });
                    localStorage.setItem('userToken', JSON.stringify(decoded.payload));

                    this.setState({
                        isAuthenticated: true
                    });
                } else {
                    this.setState({
                        permitNumber: '',
                        password: '',
                        message: res.data.message
                    });
                }

            })
            .catch(err => {
                console.log(err.res)
        })

    }

	render() {

        const {
            isAuthenticated,
            message
        } = this.state;

        if (isAuthenticated) {
            //direct to doctor homepage
            return <Redirect to = '/homepage/doctor' /> ;
        }

		return(
            <div>t
                <Card className="p-4">
                    <Form noValidate onSubmit = {this.onSubmit} className="font-weight-bold">
                        { message ? 
                            <Card border="danger" className="text-center my-3"> 
                                <Card.Body> 
                                    <Card.Title><div className="text-monospace">{ message }</div> </Card.Title>
                                </Card.Body> 
                            </Card>
                        : ''}
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Permit Number</Form.Label>
                            <Form.Control name="permitNumber" type="text" placeholder="Enter 7-digits Permit Number" value = {this.state.permitNumber} onChange={this.onChange}/>
                        </Form.Group>
    
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Enter Password" value = {this.state.password} onChange={this.onChange}/>
                        </Form.Group>
    
                        <Button variant="outline-info" type="submit" className="float-right mt-3">
                            Submit
                        </Button>
                    </Form>
                </Card>
            </div>
        );
	}
}

export default DoctorLogin;