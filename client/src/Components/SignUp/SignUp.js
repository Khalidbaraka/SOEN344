import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class SignUp extends Component{
       render() {
       
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
                    <Button variant="secondary m1" size="lg">
                            Nurse Sign Up
                    </Button>
                
                </Col>
                <Col></Col>
            </Row>


            </div>

            

           
        );
      }
}
export default SignUp;