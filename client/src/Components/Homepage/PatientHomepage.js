import React, { Component } from 'react';
import PatientNavBar from "../PatientNavBar";

const jwt = require('jsonwebtoken');

class PatientHomepage extends Component {
    constructor(props) {
        super(props);
     
    }

    render() {
        return (
            <PatientNavBar/>

        )
    }
}

export default PatientHomepage;