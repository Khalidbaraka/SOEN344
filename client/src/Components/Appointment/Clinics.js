import React, {Component} from 'react';
import {Card, CardDeck, Image} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

const ClinicImage1 = require('./../../Resources/mid-atlantic-skin-surgery-institute-3.jpg');
const ClinicImage2 = require('./../../Resources/clinic.jpg');
const ClinicImage3 = require('./../../Resources/modern-dental-office-design-with-dental-office-design-ideas-modern-clinic-in-r-floor-plans.jpg');

class Clinics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            clinics: [],
            imageURL: [],
            onRedirect: false
        }
    }

    componentDidMount = () => {
        const imageURL = [ClinicImage1, ClinicImage2, ClinicImage3];

        axios.get('/api/clinic/get_all')
            .then(res => {
                if (res.data.success === true) {
                    this.setState({
                        ...this.state,
                        clinics: res.data.clinics,
                        imageURL: imageURL
                    });
                }
            }).catch(err => console.log(err))
    }

    onSelectClinicHandler = (clinic) => {
        console.log("Click", clinic);
        localStorage.setItem("Clinic", JSON.stringify(clinic));

        this.setState({
            onRedirect: true
        });
    }

    render() {

        const {clinics, imageURL, onRedirect} = this.state;
        const path = '/homepage/patient';

        if (onRedirect) {
            return <Redirect to={path}/>
        }

        return (
            <div className="container">

                <CardDeck>

                    {clinics.map((clinic, i) => {
                        return (
                            <Card key={i}
                                  onClick={this.onSelectClinicHandler.bind(this, clinic)}
                                  className="shadow p-3 mb-5 bg-white rounded"
                                  style={{cursor: "pointer"}}>

                                <Card.Img variant="top" src={imageURL[i]}/>
                                <Card.Body>
                                    <Card.Title
                                        className="text-monospace text-center primary-color"> {clinic.name} </Card.Title>
                                    <hr/>
                                    <Card.Text>
                                        <p className="text-center font-weight-bold primary-color"> Our Team </p>
                                        <div>
                                            <span className="font-weight-bold secondary-color my-1"> Doctors </span>
                                            {clinic.doctors ? clinic.doctors.map(doctor => {
                                                return (
                                                    <div className="pl-3">
                                                        {doctor.firstName} {doctor.lastName}
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
                                    </Card.Text>
                                    <hr/>
                                    <Card.Text>
                                        <small className="float-right"> {clinic.address} </small>
                                    </Card.Text>
                                </Card.Body>

                            </Card>
                        )
                    })}
                </CardDeck>
            </div>
        );
    }
}

export default Clinics;