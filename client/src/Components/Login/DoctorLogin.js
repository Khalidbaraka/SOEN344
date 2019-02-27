import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

class DoctorLogin extends Component{
	render(){
		console.log("Logging Doctor");
		return(
            <div className="container">
               <Form>
              <Form.Group controlId="formBasicUsername">
                  <Form.Label>Permit Number</Form.Label>
                  <Form.Control type="text" placeholder="Enter 7-digits Permit Number" />
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

export default DoctorLogin;