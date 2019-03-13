import { Button, Card, Col, Dropdown, DropdownButton, Form, Modal, Row } from 'react-bootstrap';
import React, { Component } from 'react';

import CartList from './CartList';
import axios from 'axios';

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
                if (res.data) {
                    this.setState({
                        appointments: res.data
                    })
                } 

                if (this.state.appointments.length == 0) {
                    this.setState({
                        message: "You do not have any appointment yet", 
                        variant: "warning"
                    })
                }
            })
            .catch(err => console.log(err))
    }

    checkoutAppointment = () => {

        const user = JSON.parse(localStorage.getItem('userToken'));
        const healthCardNumber = encodeURI(user.healthCardNumber);

        let appointment = this.state.appointment;
        console.log(appointment);

        axios.post('/api/patients/'+ healthCardNumber +'/cart/checkout', {
            timeslot: appointment
        }).then(res => {
            if (res.data) {
                this.handleClose();
                this.getCartAppointments();
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

    handleRedirectToSchedule = () => {
        let path = `homepage/patient/scheduleAppointment`;
        this.props.history.push(path);
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
                    <Card border={variant} className="text-center my-4"> 
                        <Card.Body> 
                            <Card.Title className="text-monospace"> { message }
                                { variant == "warning" ? (
                                    <Button variant="warning" className="mx-5" onClick={this.handleRedirectToSchedule}> Schedule an Appointment? </Button>
                                ):''}
                            </Card.Title>
                        </Card.Body> 
                    </Card>
                : ''}

                <Card className="my-5">
                    <Card.Header>
                        <Card.Title className="text-center text-monospace"> Your Cart - Appointments</Card.Title>
                    </Card.Header>
                    <CartList handleShow = {this.handleShow} handleDelete={this.handleDelete} appointments={appointments} />
                </Card>

            </div>
        );
    }
}

export default Cart;

