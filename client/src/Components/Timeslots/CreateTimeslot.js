import React, { Component } from 'react';
import axios from 'axios';
import {Button, Card, Form, Row, Col, Modal, Alert} from "react-bootstrap";
import 'rc-calendar/assets/index.css';
import AppCalenderNewTimeslotEnd from "../Timeslots/AppCalenderNewTimeslotEnd";
import AppCalenderNewTimeslotStart from "../Timeslots/AppCalenderNewTimeslotStart";
import moment from "../Appointment/Identification";

class CreateTimeslot extends Component {

    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }

    getInitialState = () => {
        const initialState = {
            doctor: '',
            start: '',
            end: '',
            duration: '',
            message: '',
            variant: '',
        };
        return initialState;
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeStart = (value) => {


        const nextState = {
            ...this.state,
            start: value
        };

        console.log("onchangestart called, start is:" + value);
        this.setState(nextState);
    }

    onChangeEnd = (value) => {

        const nextState = {
            ...this.state,
            end: value
        };

        console.log("onchangeend called, end is:" + this.state.end);
        this.setState(nextState);
    }

    routeChange() {
        let path = `/homepage/doctor/schedule`;
        this.props.history.push(path);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const timeslot = {
            doctor: this.state.doctor,
            start: this.state.start,
            end: this.state.end,
            duration: this.state.duration
        };


        let string = localStorage.getItem('userToken');
        let jsonToken = JSON.parse(string);

        axios.post(`/api/doctors/${jsonToken['clinic']}/${jsonToken['permitNumber']}/schedule/create`, {
            doctor: timeslot.doctor,
            start: timeslot.start,
            end: timeslot.end
        })
            .then(res => {
                if(res.data.success) {
                    this.setState({
                        message: res.data.message,
                        variant: "success"
                    })
                }
            })
            .catch((error) => {
                if (error.response) {
                    this.setState({
                        message: error.response.data.message,
                        variant: "danger"
                    });
                }
            });
    };

    handleClose = () => {
        const nextState = this.getInitialState();
        this.setState(nextState);

        this.routeChange();
    }

    render() {

        const {
            message, variant
        } = this.state;

        return (
            <div className="container">

                <Modal show={message ? message : ''} onHide={this.handleClose}>
                    <Modal.Body closeButton>
                        <Alert variant="light" className="mt-4">
                            <h5 style={variant === "success" ? {color: "#7cab64"} : {color:"#800020"}} className="text-monospace text-center">
                                { message }
                            </h5>
                        </Alert>
                    </Modal.Body>
                </Modal>

                <Card className="my-5">
                    <Card.Body>
                        <h4 className="text-center text-monospace"> Enter Details for creating your schedule below: </h4>
                        <hr/>
                        <Form noValidate onSubmit = {this.onSubmit} className="font-weight-bold">
                            <Row>
                                <Col>
                                    <AppCalenderNewTimeslotStart
                                        value={this.state.start}
                                        onChange={this.onChangeStart}
                                    />
                                </Col>

                                <Col>
                                    <AppCalenderNewTimeslotEnd
                                        value={this.state.end}
                                        onChange={this.onChangeEnd}
                                    />
                                </Col>
                            </Row>

                            <Button variant="outline-info" type="submit" className="float-right mt-4">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default CreateTimeslot;