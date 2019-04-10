import {Alert, Button, Card, Col, Dropdown, DropdownButton, Form, Modal, Row} from 'react-bootstrap';
import React, { Component } from 'react';

import CartList from './CartList';
import axios from 'axios';
import {Link} from "react-router-dom";

class Cart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            appointments:[],
            appointment:'',
            show: false,
            variant: '', 
        }

        this.handleShow = this.handleShow.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.checkoutAppointment = this.checkoutAppointment.bind(this)

    }

    componentDidMount() {
        this.getCartAppointments();
    }

    getCartAppointments () {
        const user = JSON.parse(localStorage.getItem('userToken'));
        const healthCardNumber = encodeURI(user.healthCardNumber);

        axios.get('/api/patients/'+ healthCardNumber+ '/cart/get')
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        appointments: res.data.timeslots
                    })

                    console.log("Appointments", this.state.appointments)
                }
            })
            .catch(err => console.log(err))
    }

    checkoutAppointment = () => {

        const user = JSON.parse(localStorage.getItem('userToken'));
        const clinic = JSON.parse(localStorage.getItem('clinic'));

        let { appointment } = this.state;
        console.log(appointment);

        axios.post(`/api/patients/${user.healthCardNumber}/${clinic._id}/cart/checkout`, {
            timeslot: appointment
        }).then(res => {
            if (res.data) {
                this.setState({
                    message: "Your appointment has been set!",
                    variant: "success",
                });
                this.handleClose();
                this.getCartAppointments();

                setTimeout(function () {
                    window.location.reload();
                }, 3000);
            } else {
                console.log("failure");
            }
        }).catch((error) => {
            // Error
            if (error.response) {
                this.setState({
                    message: error.response.data.message,
                    variant: "danger",
                });
                this.handleClose();
            }  
        });
    };

    handleClose() {
        this.setState({ show: false });
    }

    handleShow(appointment) {
        this.setState({ show: true, appointment: appointment });
        console.log(appointment);
    }

    handleDelete(appointment) {

        const user = JSON.parse(localStorage.getItem('userToken'));
        const healthCardNumber = encodeURI(user.healthCardNumber);


        this.setState({ appointment: appointment });
        let deleteAppointment = this.state.appointment;
        console.log(appointment);

        axios.put('api/patients/'+ healthCardNumber +'/cart/delete',{
            timeslot:appointment
        })
            .then(res => {
                if(res.data){
                    this.getCartAppointments();
                }
            })
            .catch(err => console.log(err))
    }

    render() {

        const { appointments, message, variant} = this.state;

        return (
            <div className="container">
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Appointment Checkout </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <div>Your total amount is : {this.state.appointment.duration}$</div>

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
                    <Alert variant="light" className="mt-4">
                        <h5 style={variant === "success" ? {color: "#F9AA33"} : {color:"#800020"}} className="text-monospace text-center">{ message }
                            {variant === "success" ? (
                                <Link className="secondary-color text-decoration-none mx-4 font-weight-bold"
                                      to="/homepage/patient/myAppointment"> View your Appointments ? </Link>
                            ) : ''}
                        </h5>
                    </Alert>
                    : ''}

                <div className="my-5">
                    <h4 className="text-center text-monospace my-5"> Your Cart - Appointments</h4>
                    <CartList handleShow = {this.handleShow} handleDelete={this.handleDelete} appointments={appointments} />
                </div>

            </div>
        );
    }
}

export default Cart;

