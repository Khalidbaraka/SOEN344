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

        return (
            <div className="container">
                <h1>hello world</h1>
            </div>
        );
    }
}

export default Identification;