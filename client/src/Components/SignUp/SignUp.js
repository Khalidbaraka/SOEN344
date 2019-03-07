import {Button, Col, Container, Fade, Row} from 'react-bootstrap'
import React, { Component } from 'react';

import NurseSignUp from './NurseSignUp';
import PatientSignUp from './PatientSignUp';

class SignUp extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          isPatientSignUpOpen: false,
          isNurseSignUpOpen:false
        };
    }

    patientSignUpHandler = () => {
        const isPatientSignUpOpen = this.state.isPatientSignUpOpen;

        this.setState(prevState => ({
            ...prevState,
            isPatientSignUpOpen: !isPatientSignUpOpen,
            isNurseSignUpOpen: false
          }))
    }

    nurseSignUpHandler = () => {
        const isNurseSignUpOpen = this.state.isNurseSignUpOpen;

        this.setState(prevState => ({
            ...prevState,
            isNurseSignUpOpen: !isNurseSignUpOpen,
            isPatientSignUpOpen: false
          }))
    }

    render() {
        const { isPatientSignUpOpen } = this.state;
        const { isNurseSignUpOpen } = this.state;

        return (
            <div>
                <Container>
                    <Row className="text-center align-middle my-5" >
                        <Col md={12}>
                            <Button
                                onClick={this.patientSignUpHandler}
                                variant="outline-info"
                                className="w-25 mx-3"
                            >
                                Patient Sign Up
                            </Button>
                            <Button
                                onClick={this.nurseSignUpHandler}
                                variant="outline-info"
                                className="w-25 mx-3"
                                >
                                Nurse Sign Up
                            </Button>
                        </Col>
                    </Row>
                    <hr/>
                    <Row className="my-5">
                        <Col md={{ span: 8, offset: 2}}>
                            { isPatientSignUpOpen ? <PatientSignUp/> : "" }
                            { isNurseSignUpOpen ? <NurseSignUp/> : "" }
                        </Col>
                    </Row>
                </Container>
            </div>           
        );
      }
}
export default SignUp;