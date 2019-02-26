import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

//nurse login function
export const login = nurse => {
    return axios
    .post('api/nurses/login', {
        first_name: nurse.first_name,
        password: nurse.password
    })
    .then(res => {
        console.log("logged in")

    })
    .catch(err => {
        console.log(err)
    })
}

class NurseLogin extends Component{

    constructor(){
        super()
        this.state = {
            accessID: '',
            password: '', 
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

        login(nurse).then(res =>
        {
            if(res){
                // go to home page 
                // this.props.history.push('/NurseHomePage')
            }
        })
    }
    

    render(){
		console.log("Logging Nurse");
		return(
            <div className="container">
               <Form noValidate onSubmit = {this.onSubmit}>

              <Form.Group controlId="formBasicUsername">
                  <Form.Label>Access ID</Form.Label>
                  <Form.Control name="accessID" type="text" placeholder="Enter Access ID" value = {this.state.accessID} onChange={this.onChange}/>
                  <Form.Text className="text-muted">
                     ex: DOL96315
                  </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control name="password" type="password" placeholder="Enter Password" value = {this.state.accessID} onChange={this.onChange} />
              </Form.Group>
              
              <Button variant="primary" type="submit">
                  Submit
              </Button>
          </Form>
            </div>
        );
	}
}

export default NurseLogin;