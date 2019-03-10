import 'rc-calendar/assets/index.css';

import { Button, Card, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import React, { Component } from 'react';
import axios from 'axios';



class Identification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            test: "",
            appointments: ""
        }
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
        const { appointmentType } = this.state;

       /* const user = JSON.parse(localStorage.getItem('userToken'));
        const healthCardNumber = encodeURI(user.healthCardNumber);


        console.log('api/patients/'+ healthCardNumber+ '/appointment/get');*/
        this.getAppointments();
        console.log(this.state.appointments);
        console.log(this.state.test);

        
        return (
            <div className="container">
                <h1>Hello World</h1>
            </div>
        );
    }
}

export default Identification;