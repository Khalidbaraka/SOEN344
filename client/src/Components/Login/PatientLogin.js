import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';



class PatientLogin extends Component{

    constructor(){
        super()
        this.state = {
            healthCardNumber: '',
            password: '', 
            message: '', 
            isAuthenticated: false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e)
    {
        this.setState({[e.target.name]: e.target.value})
    }

    //go to home page after submitting 
    onSubmit(e)
    {
        e.preventDefault()

        const patient = {
            healthCardNumber: this.state.healthCardNumber,
            password: this.state.password
        }
        axios
         .post('api/patients/login', {
            healthCardNumber: patient.healthCardNumber,
            password: patient.password
         })
        .then(res => {
            if (res.data.success) {
                this.setState({
                    isAuthenticated: true
                });
            }
            else{
                this.setState({
                    healthCardNumber: '',
                    password: '',
                    message: res.data.message
                });
            }

        })
         .catch(err => {
        console.log(err.res)
        })
    
    }
    

    render(){

        const { isAuthenticated } = this.state;
        const message = this.state.message;

         if ( isAuthenticated ) {

         //direct to patient homepage
        return <Redirect to='/homepage/patient'/>;
         }

		return(
            <div>
            <Card className="p-4">
            <Form noValidate onSubmit = {this.onSubmit} className="font-weight-bold">
            { message ? 
                        <Card border="danger" className="text-center my-3"> 
                            <Card.Body> 
                                <Card.Title><div className="text-monospace">{ message }</div> </Card.Title>
                            </Card.Body> 
                        </Card>
                    : ''}
               

              <Form.Group controlId="formBasicUsername">
                  <Form.Label>Health Card Number</Form.Label>
                  <Form.Control name="healthCardNumber" type="text" placeholder="Enter Health Card Number" value = {this.state.healthCardNumber} onChange={this.onChange}/>
                  <Form.Text className="text-muted">
                     ex: DOEJ 9610 3101
                  </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control name="password" type="password" placeholder="Enter Password" value = {this.state.password} onChange={this.onChange} />
              </Form.Group>
              
              <Button variant="primary" type="submit" className="float-right mt-3">
                  Submit
              </Button>
          </Form>
          </Card>
            </div>
        );
	}
}

export default PatientLogin;
