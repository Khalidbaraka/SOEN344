import React, { Component } from 'react';

import { Card } from 'react-bootstrap'

class AppointmentList extends Component {
    render() {
        return (
            <div className="container">
                <Card>
                    <Card.Body>
                        Appointment List
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default AppointmentList;