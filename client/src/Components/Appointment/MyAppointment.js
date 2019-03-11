import 'rc-calendar/assets/index.css';

import { Button, Card, Col, Dropdown, DropdownButton, Form, Row, Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import AppointmentList from './AppointmentList';
import axios from 'axios';




class MyAppointment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appointments: [],
            message: "",
            show: false,
            appointment: ''
        }

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
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
                    console.log(res.data);
                    this.setState({
                        appointments: res.data,
                        message: res.data.message
                    })
                }
            })
            .catch(err => console.log(err))
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow = (appointment) => {

        const nextState = {
            ...this.state,
            show: true,
            appointment: appointment
        }

        this.setState(nextState, function () {console.log('State', this.state.appointment)});
        console.log("APPOINTMENT", appointment);

    }


    render() {

        const { appointments,message} = this.state;
        return (
            <div className="container">
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.appointment ? this.state.appointment.start : ''}

                        <ModifyAppoinment />
                        <AppointmentList appointments={appointments} handleShow={this.handleShow}/>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                { message ?
                    <Card border="danger" className="text-center my-3">
                        <Card.Body>
                            <Card.Title><div className="text-monospace">{ message }</div> </Card.Title>
                        </Card.Body>
                    </Card>
                    : ''}
            <Card className="my-5">

                <Card.Header>
                        <Card.Title className="text-center text-monospace">Your Appointments</Card.Title>
                </Card.Header>

                <AppointmentList appointments={appointments} handleShow={this.handleShow}/>
            </Card> 
            </div>
        );
    }
}

export default MyAppointment;