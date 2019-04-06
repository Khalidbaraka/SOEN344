import React, { Component } from 'react';
import {Card, Row, Col, Jumbotron, Button, Container, Image} from 'react-bootstrap';
import PatientSignUp from "./PatientSignUp";

const heroImage = require('./../../Resources/photo-1470075801209-17f9ec0cada6.jpg')

class SignUp extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        var styles ={
            backgroundImage: 'url(' + heroImage + ')'
        }
        return (
            <div className="container">
                <Card className="shadow p-0 my-5 bg-white rounded">
                    <Card.Body className="p-0">
                        <Row>
                            <Col md={5} className="p-0">
                                <Image src={heroImage} fluid style={{height:"100%"}}/>
                            </Col>
                            <Col md={7}>
                                <PatientSignUp/>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        );
      }
}
export default SignUp;