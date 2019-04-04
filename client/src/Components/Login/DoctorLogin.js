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
                        password: '',
                        message: res.data.message
                    });

                    this.props.updateMessage(this.state.message);
                }

            })
            .catch(err => {
                console.log(err.res)
        })

    }

	render() {

        const { isAuthenticated } = this.state;

        const { fromPath } = this.props.fromPath || { fromPath: { pathname: '/homepage/doctor' } };

        if (isAuthenticated) {
            // direct the doctor to the doctor home page or he is taken back to the initial page he was trying to access before he was redirected.
            return <Redirect to={fromPath} />;
        }

		return(
            <div>
                <Card className="p-4">
                    <Form noValidate onSubmit = {this.onSubmit} className="font-weight-bold">
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