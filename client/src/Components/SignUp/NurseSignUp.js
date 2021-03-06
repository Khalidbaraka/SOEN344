import {Button, Card, Form, Row, Col, Image} from 'react-bootstrap';
import React, {Component} from 'react';

import {Redirect} from 'react-router-dom';
import axios from 'axios';

const heroImage = require('./../../Resources/photo-1542801285-eabba3ba6ce2.jpg')

class NurseSignUp extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            accessID: '',
            password: '',
            message: '',
            isRegistered: false,
            tab: "nurse"
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillUnmount() {
        // Clear the clinic object in the localstorage, since we only need it to Register a doctor or nurse
        localStorage.removeItem("clinic");
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    //go to home page after submitting
    onSubmit(e) {
        e.preventDefault()

        const nurse = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            accessID: this.state.accessID,
            password: this.state.password
        }

        const clinic = JSON.parse(localStorage.getItem('clinic'));

        //access id and password front end validation
        const errors = {}
        const accessIDFormat = /[a-zA-Z]{3}\d{5}/
        const emptyPasswordFormat = /^$|\s+/
        errors.accessID = !nurse.accessID.match(accessIDFormat) ? "Invalid ID" : ""
        errors.password = nurse.password.match(emptyPasswordFormat) ? "Password should not be empty or contain spaces anywhere" : ""
        console.log(errors)

        if (errors.accessID === "" && errors.password === "") {

            axios.post('/api/nurses/' + clinic._id + '/register', {
                firstName: nurse.firstName,
                lastName: nurse.lastName,
                accessID: nurse.accessID,
                password: nurse.password

            }).then(res => {
                if (res.data.success) {
                    this.setState({
                        isRegistered: true
                    });
                }
            }).catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    this.setState({
                        message: error.response.data.message
                    })
                }
            });
        }
    }

    render() {

        const {isRegistered, message} = this.state;
        const clinic = JSON.parse(localStorage.getItem('clinic'));

        if (isRegistered) {
            return <Redirect to={{
                pathname: '/login',
                state: {tab: 'nurse'}
            }}/>
        }

        return (
            <div className="container">

                {message ?
                    <Card border="danger" className="text-center my-4">
                        <Card.Body>
                            <Card.Title className="text-monospace">
                                {message}
                            </Card.Title>
                        </Card.Body>
                    </Card>
                    : ''}

                <Card className="shadow p-0 my-5 bg-white rounded">
                    <Row>
                        <Col md={5} className="p-0">
                            <Image src={heroImage} fluid style={{height: "auto"}}/>
                        </Col>

                        <Col md={7} className="p-5">
                            <h4 className="text-monospace mt-4"> Signing up with {clinic.name} </h4>

                            <Form noValidate onSubmit={this.onSubmit} className="font-weight-bold my-5">

                                <Form.Group controlId="formFirstName">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control name="firstName" type="text" placeholder="Enter First Name"
                                                  value={this.state.firstName} onChange={this.onChange}/>
                                </Form.Group>

                                <Form.Group controlId="formLastName">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control name="lastName" type="text" placeholder="Enter Last Name"
                                                  value={this.state.lastName} onChange={this.onChange}/>
                                </Form.Group>

                                <Form.Group controlId="formBasicUsername">
                                    <Form.Label>Access ID</Form.Label>
                                    <Form.Control name="accessID" type="text"
                                                  placeholder="Enter ID (3 letters followed by 5 digits)"
                                                  value={this.state.accessID} onChange={this.onChange}/>
                                    <Form.Text className="text-muted">
                                        ex: DOL96315
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control name="password" type="password" placeholder="Password"
                                                  value={this.state.password} onChange={this.onChange}/>
                                </Form.Group>

                                <Button variant="outline-info" type="submit" className="float-right mt-3">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }
}

export default NurseSignUp;