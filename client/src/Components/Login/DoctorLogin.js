import React, { Component } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

import { Redirect } from 'react-router-dom';
import axios from 'axios';

class DoctorLogin extends Component{

    constructor(){
        super()
        this.state = {
            permit_number: '',
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

        const doctor = {
            permit_number: this.state.permit_number,
            password: this.state.password
        }
        axios
         .post('api/doctors/login', {
        permit_number: doctor.permit_number,
        password: doctor.password
         })
        .then(res => {
            if (res.data.success) {
                this.setState({
                    isAuthenticated: true
                });
            }
            else{
                this.setState({
                    permit_number: '',
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

            //direct to doctor homepage
            return <Redirect to='/homepage/doctor'/>;
        }

		console.log("Logging Doctor");
		return(
            <div className="container">
               <Form noValidate onSubmit = {this.onSubmit} className="font-weight-bold">
                        { message ? 
                            <Card border="danger" className="text-center my-3"> 
                                <Card.Body> 
                                    <Card.Title><div className="text-monospace">{ message }</div> </Card.Title>
                                </Card.Body> 
                            </Card>
                        : ''}
              <Form.Group controlId="formBasicUsername">
                  <Form.Label>Permit Number</Form.Label>
                  <Form.Control type="text" placeholder="Enter 7-digits Permit Number" value = {this.state.accessID} onChange={this.onChange}/>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter Password" value = {this.state.accessID} onChange={this.onChange}/>
              </Form.Group>

              <Button variant="primary" type="submit">
                  Submit
              </Button>
          </Form>

            </div>

        );
	}
}

export default DoctorLogin;