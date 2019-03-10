import 'rc-calendar/assets/index.css';

import { Button, Card, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import React, { Component } from 'react';
import AppointmentList from './AppointmentList';
import axios from 'axios';
import ItemInput from "../Items/Items";



class MyAppointment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appointments: []
        }
    }

    componentDidMount() {
        this.getAppointments();
    }

    getAppointments () {
        const user = JSON.parse(localStorage.getItem('userToken'));
        const healthCardNumber = encodeURI(user.healthCardNumber);

        axios.get('/api/patients/'+ healthCardNumber+ '/appointment/get')
            .then(res => {
                if(res.data){
                    this.setState({
                        appointments: res.data
                    })
                }
            })
            .catch(err => console.log(err))
    }


    render() {

        const { appointments } = this.state;
        console.log(this.state.appointments);

        
        return (
            <div className="container">
            <Card className="my-5">
                <Card.Header>
                        <Card.Title className="text-center text-monospace">Your Appointments</Card.Title>
                </Card.Header>

                <AppointmentList appointments={appointments} />
            </Card> 
            </div>
        );
    }
}

export default MyAppointment;