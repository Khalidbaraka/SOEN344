import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

class NurseLogin extends Component{
	render(){
		console.log("Logging Nurse");
		return(
            <div className="container">
               <Form>
              <Form.Group controlId="formBasicUsername">
                  <Form.Label>Access ID</Form.Label>
                  <Form.Control type="text" placeholder="Enter Access ID" />
                  <Form.Text className="text-muted">
                     ex: DOL96315
                  </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter Password" />
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