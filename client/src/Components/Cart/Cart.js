import React, { Component } from 'react';
import { Button, Card, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';

class Cart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: "Your Cart"
        }
    }
    render() {
        const { message} = this.state;
        return (
            
            <div className="container">
                { message ?
                    <Card border="danger" className="text-center my-3">
                        <Card.Body>
                            <Card.Title><div className="text-monospace">{ message }</div> </Card.Title>
                        </Card.Body>
                    </Card>
                    : ''}
            <Card className="my-5">

                <Card.Header>
                        <Card.Title className="text-center text-monospace">Appointments you have selected</Card.Title>
                </Card.Header>

                {/* <CartList appointments={appointments} /> */}
            </Card> 
            </div>
        );
    }
}

export default Cart;