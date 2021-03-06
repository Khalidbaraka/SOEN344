import 'rc-calendar/assets/index.css';

import {Alert, Button, Col, Modal, Row} from 'react-bootstrap';
import React, {Component} from 'react';

import AppointmentList from './AppointmentList';
import ModifyAppointment from './ModifyAppointment';
import axios from 'axios';
import {Link} from "react-router-dom";
import moment from "./Identification";

class MyAppointment extends Component {
    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }

    getInitialState = () => {
        const initialState = {
            appointments: [],
            appointment: '',
            toUpdate: false,
            variant: '',
            message: ''
        };
        return initialState;
    }

    componentDidMount = () => {
        this.getAppointments();
    }

    deleteItem = (id) => {

        let string = localStorage.getItem('userToken');
        let jsonToken = JSON.parse(string);

        axios.delete(`/api/patients/${jsonToken['healthCardNumber']}/appointment/${id}/delete`)
            .then(res => {
                if (res.data) {
                    this.setState({
                        message: "Appointment successfully deleted"
                    })
                }
            })
            .catch(err => console.log(err))
    }

    getAppointments = () => {
        const user = localStorage.getItem('userToken') ? JSON.parse(localStorage.getItem('userToken')) : null;
        const clinic = localStorage.getItem('clinic') ? JSON.parse(localStorage.getItem('clinic')) : null;

        axios.get(`/api/patients/${user.healthCardNumber}/${clinic._id}/appointment/get`)
            .then(res => {
                if (res.data) {
                    this.setState({
                        appointments: res.data
                    })

                    console.log("appointments", res.data);
                }
            })
            .catch(err => console.log(err))
    }

    onUpdateAppointment = (appointment) => {

        this.setState({
            toUpdate: true,
            appointment: appointment,
            message: ''
        });
    }

    onReturn = () => {
        const nextState = {
            ...this.state,
            toUpdate: false
        }

        this.setState(nextState);
    }

    onReset = (message, variant, toUpdate) => {
        this.setState({
            toUpdate: toUpdate,
            message: message,
            variant: variant
        })

        this.getAppointments();
    }

    handleClose = () => {
        this.setState({
            ...this.state,
            appointment: '',
            toUpdate: false,
            variant: '',
            message: ''
        });

        this.getAppointments();
    }

    render() {

        const {appointments, message, appointment, toUpdate, variant} = this.state;

        return (
            <div>
                <Modal show={message ? message : ''} onHide={this.handleClose}>
                    <Modal.Body closeButton>
                        <Alert variant="light" className="mt-4">
                            <h5 style={variant === "success" ? {color: "#7cab64"} : {color:"#800020"}} className="text-monospace text-center">
                                { message }
                            </h5>
                        </Alert>
                    </Modal.Body>
                </Modal>

                <h4 className="text-center text-monospace my-4">My Appointments</h4>

                <hr/>

                <div className="my-4">
                    {!toUpdate ? (
                        <div>
                            <AppointmentList
                                appointments={appointments}
                                onUpdateAppointment={this.onUpdateAppointment}
                                toUpdate={this.state.toUpdate}
                                deleteItem={this.deleteItem}/>
                        </div>
                    ) : (
                        <div>
                            <Row>
                                <Col md={1}>
                                    <Button size="sm" variant="outline-info" onClick={this.onReturn.bind(this)}> <i className="fa fa-chevron-left" aria-hidden="true"></i> </Button>
                                </Col>
                                <Col md={11}>
                                    <h5 className="text-monospace">Modify the Appointment</h5>
                                </Col>
                            </Row>

                            <ModifyAppointment appointment={appointment} onReset={this.onReset}/>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default MyAppointment;

