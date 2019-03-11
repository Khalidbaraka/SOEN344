import React, { Component } from 'react';
import { Button, Card, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import Table from "react-bootstrap/Table";
import AppointmentList from "../Appointment/AppointmentList";

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
            ]



        }

    }

    render() {
        const { appointments, message} = this.state;
        return (
                    <div className="container">
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

                            <AppointmentList appointments={appointments} />
                        </Card>
                    </div>


        );
    }
}

export default Cart;

