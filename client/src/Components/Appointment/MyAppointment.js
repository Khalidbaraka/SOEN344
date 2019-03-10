import 'rc-calendar/assets/index.css';

import { Button, Card, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import React, { Component } from 'react';


class Identification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appointmentType: "0"
        }
    }

    onAppointmentTypeHandler = (event) => {
        this.setState({
            appointmentType: event.target.value
        })
    }


    render() {
        const { appointmentType } = this.state;
        const user = JSON.parse(localStorage.getItem('userToken'));

        console.log(user.healthCardNumber);

        // getAppointments = () => {
        //     axios.get('api/patients/health_card_number/appointment/get')
        //     .then(res => {
        //       if(res.data){
        //         this.setState({
        //           items: res.data
        //         })
        //       }
        //     })
        //     .catch(err => console.log(err))
        // }

        
        return (
            <div className="container">
                <h1>Hello World</h1>
            </div>
        );
    }
}

export default Identification;