import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import {Button, Col, Form, Image, Row} from "react-bootstrap";
import axios from "axios";
import {Redirect} from "react-router-dom";

const heroImage = require('./../../Resources/photo-1550263454-689477d828be.jpg');

class DoctorSignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            city: '',
            permitNumber: '',
            password: '',
            isRegistered: false,
            message: ''
        }
    }

    componentWillUnmount() {
        // Clear the clinic object in the localstorage, since we only need it to Register a doctor or nurse
        localStorage.removeItem("Clinic");
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();

        const clinic = JSON.parse(localStorage.getItem('Clinic'));
        const { firstName, lastName, city, permitNumber, speciality, password } = this.state;

        axios.post('/api/doctors/' + clinic._id + '/register', {
            firstName: firstName,
            lastName: lastName,
            city: city,
            permitNumber: permitNumber,
            speciality: speciality,
            password: password

        }).then(res => {
            if (res.data.success) {
                this.setState({
                    isRegistered: true
                });

                // Clear the clinic object in the localstorage, since we only need it to Register a doctor or nurse
                localStorage.removeItem("Clinic");
            }
        }).catch((error) => {
            if (error.response) {
                this.setState({
                    message: error.response.data.message
                })
            }
        });
    }

    render() {
        const clinic = JSON.parse(localStorage.getItem('Clinic'));
        const { message, isRegistered } = this.state;

        if (isRegistered) {
            return <Redirect to={{
                pathname: '/login',
                state: {tab: 'doctor'}
            }}/>
        }

        return (
            <div className="container">

                { message ?
                    <Card border="danger" className="text-center my-4">
                        <Card.Body>
                            <Card.Title className="text-monospace">
                                { message }
                            </Card.Title>
                        </Card.Body>
                    </Card>
                    : ''}

                <Card className="shadow bg-white rounded my-5">
                    <Card.Body className="p-0">
                        <Row>
                            <Col md={6} className="p-0">
                                <Image src={heroImage} fluid style={{height:"auto"}}/>
                            </Col>
                            <Col md={6} className="p-5">
                                <h4 className="text-monospace my-4"> Signing up with {clinic.name} </h4>

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
                                        <Form.Label>City</Form.Label>
                                        <Form.Control placeholder="Enter City" name="city" value = {this.state.city} onChange={this.onChange} required/>
                                        <Form.Text className="text-muted">
                                            ex:  Toronto
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Permit Number</Form.Label>
                                        <Form.Control placeholder="Enter your Permit Number" name="permitNumber" value = {this.state.permitNumber} onChange={this.onChange} required/>
                                        <Form.Text className="text-muted">
                                            7 digits Permit Number
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Speciality</Form.Label>
                                        <Form.Control placeholder="Medical Specialization" name="speciality" value = {this.state.speciality} onChange={this.onChange} required/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" name="password" value = {this.state.password} onChange={this.onChange} required/>
                                    </Form.Group>

                                    <Button variant="outline-info" type="submit" className="float-right my-3" >
                                        Submit
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default DoctorSignUp;