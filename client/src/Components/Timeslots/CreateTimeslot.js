import React, { Component } from 'react';
import axios from 'axios';
import {Button, Card, Form, Row, Col} from "react-bootstrap";
import 'rc-calendar/assets/index.css';
import AppCalenderNewTimeslotEnd from "../Timeslots/AppCalenderNewTimeslotEnd";
import AppCalenderNewTimeslotStart from "../Timeslots/AppCalenderNewTimeslotStart";

class CreateTimeslot extends Component {

    constructor(props) {
        super(props);

        this.state = {
            doctor: '',
            start: '',
            end: '',
            duration: '',
            message: ''
        }
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

        axios.post(`/api/doctors/${jsonToken['permitNumber']}/schedule/create`, {
                doctor: timeslot.doctor,
                start: timeslot.start,
                end: timeslot.end
            })
            .then(res => {
                if(res.status == 200) {
                    console.log("Timeslot successfully added!");
                    this.routeChange();
                } else {
                    console.log("Unable to add timeslot");
                    console.log(res);
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
            <div className="container">
                <Card className="my-5">
                    <Card.Body>
                        <h4 className="text-center text-monospace"> Enter Details for creating your schedule below: </h4>
                        <hr/>
                        <Form noValidate onSubmit = {this.onSubmit} className="font-weight-bold">
                            { message ?
                                <Card border="danger" className="text-center my-3">
                                    <Card.Body>
                                        <Card.Title><div className="text-monospace">{ message }</div> </Card.Title>
                                    </Card.Body>
                                </Card>
                                : ''}
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