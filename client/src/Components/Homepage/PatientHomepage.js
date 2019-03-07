import React, { Component } from 'react';

import { Link } from 'react-router-dom'

const jwt = require('jsonwebtoken');

class PatientHomepage extends Component {
    constructor(props) {
        super(props);
     
    }

    render() {
        return (
            <div>
                <h1> Patient Homepage </h1>
                <Link to='/testing'> Make Appointment </Link>
            </div>
        );
    }
}

export default PatientHomepage;