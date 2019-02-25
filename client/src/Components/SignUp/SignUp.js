import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Fade from 'react-bootstrap/Fade'
import Form from 'react-bootstrap/Form'
import NurseSignUp from './NurseSignUp';

class SignUp extends Component{
    constructor(props, context) {
        super(props, context);
    
        this.state = {
          open: false,
        };
      }

       render() {
       const { open } = this.state;
        return (
            <div>

            <Row className="text-center align-middle" style={{ lineHeight: '250px' }}>
                    <div>
                        .
                    </div>
            </Row>
            <Row className="text-center align-middle" >
                <Col></Col>
                <Col>
                        
                        <Button variant="primary m1" size="lg">
                        Patient Sign Up
                        </Button>
                        
                       
                </Col>
                <Col>

                
                     
                <Button
                    onClick={() => this.setState({ open: !open })}
                    aria-controls="example-fade-text"
                    aria-expanded={open}
                    >
                    Nurse Sign Up
                </Button>
                <Fade in={this.state.open}>
                    <div id="example-fade-text">
                        
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Access ID</Form.Label>
                                <Form.Control type="email" placeholder="Enter ID" />
                                <Form.Text className="text-muted">
                                ex: DOL96315
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>

                    </div>
                </Fade>


                
                </Col>
                <Col>
               
                
                
                
                </Col>
            </Row>


            </div>

            

           
        );
      }
}
export default SignUp;