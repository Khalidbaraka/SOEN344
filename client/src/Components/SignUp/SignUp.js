import {Button, Col, Container, Fade, Row} from 'react-bootstrap'
import React, { Component } from 'react';

import NurseSignUp from './NurseSignUp';

class SignUp extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          open: false,
        };
    }

    render() {
        const { open } = this.state;

        return (
            <div>
                <Container>
                    <Row className="text-center align-middle my-5" >
                        <Col md={{ span: 4, offset: 2 }}>
                            <Button variant="primary m1">
                                Patient Sign Up
                            </Button>     
                        </Col>
                        <Col md={4}>                     
                            <Button
                                onClick={() => this.setState({ open: !open })}
                                aria-controls="example-fade-text"
                                aria-expanded={open}
                                >
                                Nurse Sign Up
                            </Button>
                            <Fade in={this.state.open} className="my-5">
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