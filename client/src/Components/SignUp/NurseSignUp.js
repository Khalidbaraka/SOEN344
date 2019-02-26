import { Button, Card, Form } from 'react-bootstrap';
import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import axios from 'axios';

class NurseSignUp extends Component{
    constructor() {
        super();
        this.state = {
            first_name: '',
            last_name: '',
            accessID: '',
            password: '', 
            message: '', 
            isAuthenticated: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);  
    }
  
    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

  //go to home page after submitting 
    onSubmit(e) {
        e.preventDefault()

        const nurse = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            accessID: this.state.accessID,
            password: this.state.password
        }

        //access id and password front end validation
        const errors = {}
        const accessIDFormat = /[a-zA-Z]{3}\d{5}/
        const emptyPasswordFormat = /^$|\s+/
        errors.accessID = !nurse.accessID.match(accessIDFormat) ? "Invalid ID" : ""
        errors.password = nurse.password.match(emptyPasswordFormat) ? "Password should not be empty or contain spaces anywhere": ""
        console.log(errors) 

        if (errors.accessID === "" && errors.password === "") {

            axios.post('api/nurses/register', {
                first_name: nurse.first_name,
                last_name: nurse.last_name,
                accessID: nurse.accessID,
                password: nurse.password
            })
            .then(res => {
  
                if (res.data.success) {
                    this.setState({
                        isAuthenticated: true
                    });
                    
                } else {
                    this.setState({
                        first_name: '',
                        last_name: '',
                        accessID: '',
                        password: '',
                        message: res.data.message
                    });
                }
            }).catch(error => {
                console.log(error.res);
            });
        } 
    }

  render() {

    const { isAuthenticated } = this.state;

    if ( isAuthenticated ) {
        return <Redirect to='/homepage/nurse'/>;
    }

    const message = this.state.message;

    return (
         <div>
            <Card className="p-4">
                <Form noValidate onSubmit = {this.onSubmit} className="font-weight-bold">
                    { message ? 
                        <Card border="danger" className="my-3"> 
                            <Card.Body> 
                                <Card.Title>{ message } </Card.Title>
                            </Card.Body> 
                        </Card>
                    : ''}
                    <Form.Group controlId="formFirstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control name = "first_name" type="text" placeholder="Enter First Name" value = {this.state.first_name} onChange={this.onChange} />
                    </Form.Group>
    
                    <Form.Group controlId="formLastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control name = "last_name" type="text" placeholder="Enter Last Name" value = {this.state.last_name} onChange={this.onChange} />
                    </Form.Group>
    
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Access ID</Form.Label>
                        <Form.Control name = "accessID" type="text" placeholder="Enter ID (3 letters followed by 5 digits)" value = {this.state.accessID} onChange={this.onChange} />
                        <Form.Text className="text-muted">
                            ex: DOL96315
                        </Form.Text>
                    </Form.Group>
    
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name = "password" type="password" placeholder="Password" value = {this.state.password} onChange={this.onChange} />
                    </Form.Group>
                    
                    <Button variant="outline-info" type="submit" className="float-right mt-3">
                        Submit
                    </Button>
                 </Form>
            </Card>
         </div>
    );
  }
}
export default NurseSignUp;