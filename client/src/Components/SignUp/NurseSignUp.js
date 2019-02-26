import { Button, Form } from 'react-bootstrap';
import React, { Component } from 'react';
import axios from 'axios';

//nurse register function
export const register = newNurse => {
  return axios
  .post('api/nurses/register', {
      first_name: newNurse.first_name,
      last_name: newNurse.last_name,
      accessID: newNurse.accessID,
      password: newNurse.password
  })
  .then(res => {
      console.log("successfully registered")
  })
}

class NurseSignUp extends Component{
  constructor() {
    super()
    this.state = {
        first_name: '',
        last_name: '',
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
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          accessID: this.state.accessID,
          password: this.state.password
      }

      register(nurse).then(res =>
      {
          if(res){
              // go to nurse home page after completing registration 
              // this.props.history.push('/NurseHomePage')
          }
      })
  }

  render() {
    return (
      <div>
          <Form noValidate onSubmit = {this.onSubmit}>
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
              
              <Button variant="primary" type="submit">
                  Submit
              </Button>
          </Form>
      </div>
    );
  }
}
export default NurseSignUp;