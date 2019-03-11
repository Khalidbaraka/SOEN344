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
                {type: "Annual",
                    clinic: null,
                    doctor: "James",
                    room: "2",
                    start : "2019-03-20T21:33:00.000Z",
                    patient : "Kelly",
                    end : "2019-03-20T22:00:00.000Z",
                    duration : "40",
                    price : 60},
                {type: "Walk-In",
                    clinic: null,
                    doctor: "Jenny",
                    room: "2",
                    start : "2019-10-20T21:40:00.000Z",
                    patient : "Kelly",
                    end : "2019-10-20T22:00:00.000Z",
                    duration : "40",
                    price : 60},
                {type: "Annual",
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
        this.getCheckoutItem = this.getCheckoutItem.bind(this)

    }

    getCheckoutItem = () => {

        // const appointment = {
        //     healthCardNumber: this.state.healthCardNumber,
        //     password: this.state.password
        // }

        console.log(this.state.appointment);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow(appointment) {
        this.setState({ show: true, appointment: appointment });
        
    }

    formatAppointments(){

        let {appointments} = this.state;
        //formatting cart data
        for(let i = 0; i < appointments.length; i++){

            appointments[i].duration += " minutes";
            appointments[i].price += "$";

            let d = new Date(appointments[i].start);

            let date = ("0" + d.getDate().toString()).slice(-2);
            let month = ("0" + (d.getMonth() + 1).toString()).slice(-2);
            let year = d.getUTCFullYear().toString();
            let hour = ("0" + (d.getUTCHours() - 4).toString()).slice(-2);
            let minute = ("0" + d.getUTCMinutes().toString()).slice(-2);

            appointments[i].start = date + "/" +  month + "/"+ year + "  at " + hour + ":" + minute;

            if(appointments[i].type === 0){
                appointments[i].type = "Walk-in";
            }
            else if(appointments[i].type === 1){
                appointments[i].type = "Annual";
            }
        }

        this.setState({ appointments: appointments });

    }




    render() {
        //this.formatAppointments();
        const { appointments, message, appointment} = this.state;
        return (
                    <div className="container">
                        <Modal show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={this.getCheckoutItem}>
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

