import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';



class NurseLogin extends Component{

    constructor(){
        super()
        this.state = {
            accessID: '',
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

        const nurse = {
            accessID: this.state.accessID,
            password: this.state.password
        }
        axios
         .post('api/nurses/login', {
        accessID: nurse.accessID,
        password: nurse.password
         })
        .then(res => {
            if (res.data.success) {
                this.setState({
                    isAuthenticated: true
                });
            }
            else{
                this.setState({
                    accessID: '',
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

         if ( isAuthenticated ) {
         //collapse login modal
         'LoginModal'.modal('hide')
         
         //direct to nurse homepage
        return <Redirect to='/homepage/nurse'/>;
         }

        const message = this.state.message;
		return(
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
               

              <Form.Group controlId="formBasicUsername">
                  <Form.Label>Access ID</Form.Label>
                  <Form.Control name="accessID" type="text" placeholder="Enter Access ID" value = {this.state.accessID} onChange={this.onChange}/>
                  <Form.Text className="text-muted">
                     ex: DOL96315
                  </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control name="password" type="password" placeholder="Enter Password" value = {this.state.password} onChange={this.onChange} />
              </Form.Group>
              
              <Button variant="primary" type="submit">
                  Submit
              </Button>
          </Form>
          </Card>
            </div>
        );
	}
}

export default NurseLogin;