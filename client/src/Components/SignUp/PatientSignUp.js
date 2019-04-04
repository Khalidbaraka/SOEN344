import {Button, Card, Form} from 'react-bootstrap';
import React, { Component } from 'react';

import Col from "react-bootstrap/Col";
import {Redirect, Link} from "react-router-dom";
import Row from "react-bootstrap/Row";
import axios from 'axios';

class PatientSignUp extends Component{
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            birthday: "",
            gender: "Male", //Male by default as by the dropdown
            physicalAddress: "",
            emailAddress: "",
            healthCardNumber: "",
            password: "",
            isRegistered: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();

        const patient = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            birthday: this.state.birthday,
            gender: this.state.gender,
            physicalAddress: this.state.physicalAddress,
            emailAddress: this.state.emailAddress,
            healthCardNumber: this.state.healthCardNumber,
            password: this.state.password

        };
        console.log(patient);
        //access id and password front end validation
        const errors = {};
        const healthCardFormat = /[a-zA-Z]{4}\s\d{4}\s\d{4}/;
        const birthdayFormat = /\d{8}/;
        const phoneNumberFormat = /\d{10}/;

        errors.healthCardNumber = !patient.healthCardNumber.match(healthCardFormat) ? "Invalid health card number" : "";
        errors.birthday = !patient.birthday.match(birthdayFormat) ? "Invalid birthday" : "";
        errors.phoneNumber = !patient.phoneNumber.match(phoneNumberFormat) ? "Invalid phone number": "";
        console.log(errors);

        if (errors.healthCardNumber === "" && errors.birthday === "" && errors.phoneNumber === "") {

            axios.post('api/patients/register', {
                firstName: patient.firstName,
                lastName: patient.lastName,
                phoneNumber: patient.phoneNumber,
                birthday: patient.birthday,
                gender: patient.gender,
                physicalAddress: patient.physicalAddress,
                emailAddress: patient.emailAddress,
                healthCardNumber: patient.healthCardNumber,
                password: patient.password
            }).then(res => {

                    if (res.data.success) {
                        this.setState({
                            isRegistered: true
                        });

                    } else {
                        this.setState({
                            firstName: "",
                            lastName: "",
                            phoneNumber: "",
                            birthday: "",
                            gender: "Male",
                            physicalAddress: "",
                            emailAddress: "",
                            healthCardNumber: "",
                            password: "",
                        });
                    }
                }).catch(error => {
                console.log(error.res);
            });
        }
    }


    render() {

        const { isRegistered } = this.state;

        if ( isRegistered ) {
            return <Redirect to='/login'/>;
        }

        return (
            <div className="p-4">
                <h4 className="text-monospace primary-color mt-4"> Register </h4>
                <Row>
                    <Col className="mb-4 secondary-color">
                        <h6> New Patient? Start here! </h6>
                    </Col>

                    <Col className="text-center">
                        <h6> OR </h6>
                    </Col>
                    <Col className="text-right font-weight-bold secondary-color text-decoration-none">
                        <span> Nurse? </span><Link to={{ pathname: "/clinics", state: { user: 'nurse' } }} className="secondary-color text-decoration-none"> Click here </Link>
                    </Col>
                </Row>

                <Form onSubmit = {this.onSubmit} className="font-weight-bold">
                    <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control placeholder="First name" name="firstName" value = {this.state.firstName} onChange={this.onChange} required/>
                        </Col>
                        <Col>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control placeholder="Last name" name="lastName" value = {this.state.lastName} onChange={this.onChange} required/>
                        </Col>
                    </Row>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control placeholder="Enter Birthday" name="birthday" value = {this.state.birthday} onChange={this.onChange} required/>
                        <Form.Text className="text-muted">
                            Format: DDMMYYYY ex:  22021995 for February 22nd, 1995
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Gender</Form.Label>
                        <Form.Control as="select" name="gender" value = {this.state.gender} onChange={this.onChange} required>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control placeholder="Enter Phone Number" name="phoneNumber" value = {this.state.phoneNumber} onChange={this.onChange} required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email Address" name="emailAddress" value = {this.state.emailAddress} onChange={this.onChange} required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="Enter Address" name="physicalAddress" value = {this.state.physicalAddress} onChange={this.onChange} required/>
                        <Form.Text className="text-muted">
                            ex:  123 1st Avenue
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Health Care ID</Form.Label>
                        <Form.Control placeholder="Enter Health Card Number" name="healthCardNumber" value = {this.state.healthCardNumber} onChange={this.onChange} required/>
                        <Form.Text className="text-muted">
                            ex:  LOUX 0803 2317
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value = {this.state.password} onChange={this.onChange} required/>
                    </Form.Group>

                    <Button variant="outline-info" type="submit" className="float-right my-3" >
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}
export default PatientSignUp;