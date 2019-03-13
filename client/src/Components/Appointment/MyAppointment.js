import 'rc-calendar/assets/index.css';

import { Button, Card, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import React, { Component } from 'react';

import AppointmentList from './AppointmentList';
import ModifyAppointment from './ModifyAppointment';
import axios from 'axios';

class MyAppointment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appointments: [],
            message: "",
            appointment: '',
            toUpdate: false
        }

    }

    componentDidMount() {
        this.getAppointments();
    }

    deleteItem(id) {

        let string = localStorage.getItem('userToken');
        let jsonToken = JSON.parse(string);

        axios.delete(`/api/patients/${jsonToken['healthCardNumber']}/appointment/${id}/delete`)
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

        window.location.reload()
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

    onUpdateAppointment = (appointment) => {

        console.log("Appointment on Update", appointment );

        this.setState({
            toUpdate: true,
            appointment: appointment
        });
    }

    onReturn = () => {
        const nextState = {
            ...this.state,
            toUpdate: false
        }

        this.setState(nextState);
    }

    render() {

        const { appointments,message,appointment,toUpdate} = this.state;
        return (
            <div className="container">
                { message ?
                    <Card border="danger" className="text-center my-3">
                        <Card.Body>
                            <Card.Title><div className="text-monospace">{ message }</div> </Card.Title>
                        </Card.Body>
                    </Card>
                : ''}

                    <Card className="my-5" style={{width:1000}}>
                    
                    { !toUpdate ? (
                        <div>
                            <Card.Header>
                                    <Card.Title className="text-center text-monospace">Your Appointments</Card.Title>
                            </Card.Header>

                            <AppointmentList 
                                appointments = {appointments}
                                onUpdateAppointment = {this.onUpdateAppointment}
                                toUpdate = {this.state.toUpdate}
                                deleteItem = {this.deleteItem} />
                        </div>

                    ) : (
                        
                        <div>
                            <Card.Header>
                                <Row>
                                    <Col md={1}>
                                        <Button variant="outline-info" onClick={this.onReturn.bind(this)}> <i className="fa fa-chevron-left" aria-hidden="true"></i> </Button>
                                    </Col>
                                    <Col md={11}>
                                        <Card.Title className="text-center text-monospace">Modify the Appointment</Card.Title>
                                    </Col>
                                </Row>
                            </Card.Header>

                            <ModifyAppointment appointment = {appointment}/>
                        </div>
                    )}

                </Card>
           </div>
        );
    }
}

export default MyAppointment;

