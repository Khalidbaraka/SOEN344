import React, { Component } from 'react';

import { Card } from 'react-bootstrap'

class AppointmentList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            appointmentType: '',
            startTime: ''
        }
    }

    componentDidMount = () => {
        console.log("AppointmentType", this.state.appointmentType);
        console.log("startTime", this.state.startTime);
        
    }
    
    render() {
        return (
            <div className="container">
                <Card className="my-5">
                    <Card.Body>
                        <Card.Title className="text-center text-monospace">Identification</Card.Title>
                        <hr/>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default AppointmentList;