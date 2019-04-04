import React, {Component} from 'react';
import {Row, Col, Card} from 'react-bootstrap';
import Image from "react-bootstrap/Image";

class ClinicHomepage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clinic: ''
        }
    }

    componentDidMount = () => {
        const clinic = JSON.parse(localStorage.getItem('Clinic'));

        this.setState({
            ...this.state,
            clinic: clinic
        })
    }

    render() {

        const {clinic} = this.state;

        return (
            <div>
                <h4 className="text-monospace text-center primary-color my-4"> Welcome to {clinic.name} </h4>
                <hr/>
                <Row className="my-4">
                    <Col md={6}>
                        <Image src={clinic.imageURL} fluid rounded />
                    </Col>
                    <Col md={6} className="text-monospace">
                        <p className="text-center font-weight-bold primary-color"> Our Team </p>

                        <div>
                            <span className="font-weight-bold secondary-color my-1"> Doctors </span>
                            {clinic.doctors ? clinic.doctors.map(doctor => {
                                return (
                                    <div className="pl-3">
                                        {doctor.firstName} {doctor.lastName} - {doctor.speciality}
                                    </div>
                                )
                            }) : ''}
                        </div>
                        <div className="mt-3">
                            <span className="font-weight-bold secondary-color my-1"> Nurses </span>
                            {clinic.nurses ? clinic.nurses.map(nurse => {
                                return (
                                    <div className="pl-3">
                                        {nurse.firstName} {nurse.lastName}
                                    </div>
                                )
                            }) : ''}
                        </div>
                    </Col>
                </Row>

            </div>
        );
    }
}

export default ClinicHomepage;