import {Button, Col, Container, Fade, Row} from 'react-bootstrap'
import React, { Component } from 'react';

import NurseSignUp from './NurseSignUp';
import PatienSignUp from './PatientSignUp'

class SignUp extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          PatientOpen: false,
          NurseOpen:false
        };
    }

    render() {
        const { PatientOpen } = this.state;
        const { NurseOpen } = this.state;

        return (
            <div>
                <Container>
                    <Row className="text-center align-middle my-5" >
                        <Col md={6}>
                            <Button
                                onClick={() => this.setState({ PatientOpen: !PatientOpen })}
                                aria-controls="example-fade-text"
                                aria-expanded={PatientOpen}
                            >
                                Patient Sign Up
                            </Button>
                            <Fade in={this.state.PatientOpen} className="my-5">
                                <div id="example-fade-text">
                                    <PatienSignUp/>
                                </div>
                            </Fade>
                        </Col>
                        <Col md={6}>
                            <Button
                                onClick={() => this.setState({ NurseOpen: !NurseOpen })}
                                aria-controls="example-fade-text"
                                aria-expanded={NurseOpen}
                                >
                                Nurse Sign Up
                            </Button>
                            <Fade in={this.state.NurseOpen} className="my-5">
                                <div id="example-fade-text">
                                    <NurseSignUp/>
                                </div>
                            </Fade>                
                        </Col>
                    </Row>
                </Container>
            </div>           
        );
      }
}
export default SignUp;