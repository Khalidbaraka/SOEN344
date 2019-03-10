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
            test: "asd",
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
                        test: "blah",
                        appointments: res.data
                    })
                }
            })
            .catch(err => console.log(err))
    }


    render() {

        const { appointments } = this.state;
        console.log(this.state.appointments);
        console.log(this.state.test);

        
        return (
            <div className="container">
                <h1 className="text-center my-4"> Appointments </h1>
                <AppointmentList appointments={appointments} />
            </div>
        );
    }
}

export default MyAppointment;