import React, { Component } from 'react';

const jwt = require('jsonwebtoken');

class PatientHomepage extends Component {
    constructor(props) {
        super(props);
     
    }

    render() {
        return (
            <div>
                <h1> Patient Homepage </h1>
            </div>
        );
    }
}

export default PatientHomepage;