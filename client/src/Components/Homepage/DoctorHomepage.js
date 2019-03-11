import React, { Component } from 'react';
import axios from 'axios';
import {Button, Card, Form} from "react-bootstrap";
import 'rc-calendar/assets/index.css';
import AppCalenderNewTimeslotEnd from "../Timeslots/AppCalenderNewTimeslotEnd";
import AppCalenderNewTimeslotStart from "../Timeslots/AppCalenderNewTimeslotStart";

class DoctorHomepage extends Component {

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
        console.log("Moment END", value.toDate());

        const nextState = {
            ...this.state,
            end: value
        };

        this.setState(nextState);
    }

    onChangeEnd = (value) => {
        console.log("Moment Start:" + value.toDate());


        const nextState = {
            ...this.state,
            start: value
        };

        this.setState(nextState);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const timeslot = {
            doctor: this.state.doctor,
            start: this.state.start.toDate(),
            end: this.state.end.toDate(),
            duration: this.state.duration
        };


        // alert("Start: " + timeslot.start + " End: " + timeslot.end);

        console.log("calling add timeslot post");
        console.log("doctor: " + timeslot.doctor);
        axios.post('/api/doctors/1111111/schedule/create', {
                doctor: timeslot.doctor,
                start: timeslot.start,
                end: timeslot.end
            })
            .then(res => {
                if(res.status == 200) {
                    console.log("Timeslot successfully added!");
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
                <h1> Doctor Homepage </h1>
        );
    }
}

export default DoctorHomepage;