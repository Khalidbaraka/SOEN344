import React, { Component } from 'react';
import axios from 'axios';
import {Button, Card, Form} from "react-bootstrap";

class DoctorHomepage extends Component {

    constructor() {
        super();

        this.state = {
            doctor: '',
            start: '',
            end: '',
            duration: '',
            message: '',
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const timeslot = {
            doctor: this.state.doctor,
            start: this.state.start,
            end: this.state.end,
            duration: this.state.duration
        };

        axios.post("api/doctors/permitNumber/schedule/create", {
                doctor: timeslot.doctor,
                start: timeslot.start,
                end: timeslot.end,
                duration: timeslot.duration
            })
            .then(res => {
                if(res.data.success) {
                    console.log("Timeslot successfully added!");
                } else {
                    console.log("Unable to add timeslot");
                }
            })
            .catch(err => {
                console.log(err)
            });
    };

    render() {

        const {
            message
        } = this.state;

        return (
            <div>
                <h1> Doctor Homepage </h1>
                <br />
                <h3> Enter Details for creating your schedule below: </h3>

                <Form noValidate onSubmit = {this.onSubmit} className="font-weight-bold">
                    { message ?
                        <Card border="danger" className="text-center my-3">
                            <Card.Body>
                                <Card.Title><div className="text-monospace">{ message }</div> </Card.Title>
                            </Card.Body>
                        </Card>
                        : ''}
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control name="start" type="text" placeholder="Enter Start Time" value = {this.state.start} onChange={this.onChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>End Time</Form.Label>
                        <Form.Control name="end" type="text" placeholder="Enter End Time" value = {this.state.end} onChange={this.onChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Doctor ID Number</Form.Label>
                        <Form.Control name="doctor" type="text" placeholder="Enter Doctor ID Number" value = {this.state.doctor} onChange={this.onChange}/>
                    </Form.Group>

                    <Button variant="outline-info" type="submit" className="float-right mt-3">
                        Submit
                    </Button>
                </Form>

            </div>
        );
    }
}

export default DoctorHomepage;