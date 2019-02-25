import { Button, Form } from 'react-bootstrap';
import React, { Component } from 'react';

class NurseSignUp extends Component{
  constructor(props) {
    super(props);
    
  }
  
  render() {
    return (
      <div>
          <Form>
              <Form.Group controlId="formFirstName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control type="text" placeholder="Enter First Name" />
              </Form.Group>

              <Form.Group controlId="formLastName">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Last Name" />
              </Form.Group>

              <Form.Group controlId="formBasicUsername">
                  <Form.Label>Access ID</Form.Label>
                  <Form.Control type="text" placeholder="Enter ID (3 letters followed by 5 digits)" />
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
    );
  }
}
export default NurseSignUp;