import React, {Component} from 'react';
import {Row, Col, Card, Modal, Button} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import {Link} from 'react-router-dom';
import axios from 'axios';
import moment from "../Schedule/UpdateSchedule";

class ClinicHomepage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clinic: '',
            selectedDoctor: '',
            selectedDoctorSchedule: [],
            show: false
        }
    }

    componentDidMount = () => {
        const clinic = localStorage.getItem('clinic') ? JSON.parse(localStorage.getItem('clinic')) : null;

        this.setState({
            ...this.state,
            clinic: clinic
        })
    }

    onSelectDoctor = (doctor) => {
        const { show } = this.state;

        this.setState({
            show: !show,
            selectedDoctor: doctor,
        });

        axios.get(`/api/doctors/${doctor.permitNumber}/schedule/get`)
            .then(res => {
                if (res.data) {
                    this.setState({
                        selectedDoctorSchedule: res.data
                    });

                   const scheduleCopy = [...this.state.selectedDoctorSchedule];
                   let newArray = [];

                   scheduleCopy.map(timeslot => {
                       var formatTimeslot = {
                           id: timeslot._id,
                           start: new Date(timeslot.start).toString().slice(0, 25),
                           end: new Date(timeslot.end).toString().slice(0, 25)
                       }

                       newArray.push(formatTimeslot);
                   })

                    this.setState({
                        selectedDoctorSchedule: newArray
                    })
                }
            }).catch(error => {
                if (error.response) {

                }
        })
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    render() {

        const {clinic, selectedDoctor, selectedDoctorSchedule } = this.state;

        return (
            <div>
                {clinic != null ? (
                    <div>
                        <Modal show={this.state.show} onHide={this.handleClose} size="lg">
                            <Modal.Header closeButton>
                                <Modal.Title> <span className="text-monospace"> { selectedDoctor.firstName} {selectedDoctor.lastName} </span> </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedDoctorSchedule.length > 0 ? selectedDoctorSchedule.map(timeslot => {
                                    return (
                                        <div className="text-monospace pb-3 text-center"> >>
                                            <span className="font-weight-bold"> {timeslot.start} </span>
                                            to
                                            <span className="font-weight-bold"> {timeslot.end} </span>
                                        </div>
                                    )
                                }) :
                                    <span className="text-monospace pb-3 font-weight-bold"> >> Sorry, this doctor schedule is currently empty. </span>
                                }
                            </Modal.Body>
                        </Modal>

                        <h4 className="text-monospace text-center primary-color my-4"> Welcome to {clinic.name} </h4>
                        <hr/>
                        <Row className="my-4">
                            <Col md={6}>
                                <Image src={clinic.imageURL} fluid rounded/>
                            </Col>
                            <Col md={6} className="text-monospace">
                                <p className="text-center font-weight-bold primary-color lead"> Our Team </p>

                                <div>
                                    <span className="font-weight-bold secondary-color my-1"> Doctors </span>
                                    {clinic.doctors ? clinic.doctors.map(doctor => {
                                        return (
                                            <div className="pl-3" style={{cursor: "pointer"}} onClick={this.onSelectDoctor.bind(this, doctor)}>
                                                <span className="font-weight-bold"> {doctor.firstName} {doctor.lastName} </span> - {doctor.speciality}
                                            </div>
                                        )
                                    }) : ''}
                                </div>
                                <div className="mt-3">
                                    <span className="font-weight-bold secondary-color my-1"> Nurses </span>
                                    {clinic.nurses ? clinic.nurses.map(nurse => {
                                        return (
                                            <div className="pl-3">
                                                <span className="font-weight-bold"> {nurse.firstName} {nurse.lastName} </span>
                                            </div>
                                        )
                                    }) : ''}
                                </div>
                            </Col>
                        </Row>

                    </div>
                ) : (
                    <div>
                        <h4 className="text-monospace text-center primary-color my-4"> Welcome. Please choose your <Link
                            to='/clinics' className="secondary-color text-decoration-none"> Clinic </Link></h4>
                        <hr/>
                    </div>
                )}

            </div>
        );
    }
}

export default ClinicHomepage;