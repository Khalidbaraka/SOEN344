import React, { Component } from 'react';
import { Button, Card, Col, Dropdown, DropdownButton, Form, Row, Modal } from 'react-bootstrap';
import Table from "react-bootstrap/Table";
import AppointmentList from "../Appointment/AppointmentList";
import Axios from 'axios';

import CartList from './CartList';

class Cart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: "Your Cart",
            appointments:[
                {type: 0,
                    clinic: null,
                    doctor: "James",
                    room: "2",
                    start : "2019-03-20T21:33:00.000Z",
                    patient : "Kelly",
                    end : "2019-03-20T22:00:00.000Z",
                    duration : "40",
                    price : 60},
                {type: 1,
                    clinic: null,
                    doctor: "Jenny",
                    room: "2",
                    start : "2019-10-20T21:40:00.000Z",
                    patient : "Kelly",
                    end : "2019-10-20T22:00:00.000Z",
                    duration : "40",
                    price : 60},
                {type: 1,
                    clinic: null,
                    doctor: "James",
                    room: "2",
                    start : "2019-03-20T21:33:00.000Z",
                    patient : "Kelly",
                    end : "2019-03-20T22:00:00.000Z",
                    duration : "40",
                    price : 60}
            ],
            appointment:'',
            show: false
        }

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.checkoutAppointment = this.checkoutAppointment.bind(this)

    }

    checkoutAppointment = () => {


        console.log(this.state.appointment);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow(appointment) {
        this.setState({ show: true, appointment: appointment });
    }

    render() {
        //this.formatAppointments();
        const { appointments, message} = this.state;
        return (
                    <div className="container">
                        <Modal show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Appointment Checkout </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Your total amount is : {this.state.appointment.price}

                                    <Form noValidate onSubmit = {this.onSubmit} className="font-weight-bold">
                                        <Form.Group controlId="credit_card">
                                            <Form.Label>Credit Card Number</Form.Label>
                                            <Form.Control maxLength={16} name="credit_card" type="text" placeholder="Enter Credit Card Number"/>
                                            <Form.Text className="text-muted">
                                                ex: 1111 2222 3333 4444
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group controlId="exp_datae">
                                            <Form.Label>Expiration Date</Form.Label>
                                            <Form.Control maxLength={4} name="exp_date" type="text" placeholder="Enter Expiration date"/>
                                            <Form.Text className="text-muted">
                                                ex: 0820 for August 2020
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group controlId="cvv">
                                            <Form.Label>CVV</Form.Label>
                                            <Form.Control maxLength={3} name="cvv" type="text" placeholder="Enter CVV"/>
                                            <Form.Text className="text-muted">
                                                ex: 567
                                            </Form.Text>
                                        </Form.Group>
                                    </Form>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={this.checkoutAppointment}>
                                    Submit
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
                                <Card.Title className="text-center text-monospace"> Appointments</Card.Title>
                            </Card.Header>
                            <CartList handleShow = {this.handleShow} appointments={appointments} />
                        </Card>
                    </div>


        );
    }
}

export default Cart;

