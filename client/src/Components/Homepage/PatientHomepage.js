import React, { Component } from 'react';
import PatientNavBar from "../PatientNavBar";
import {Route, Switch} from "react-router-dom";

const jwt = require('jsonwebtoken');

class PatientHomepage extends Component {
    constructor(props) {
        super(props);
     
    }

    render() {
        return (
            <div>Welcome to Patient Page</div>

        )
    }
}

export default PatientHomepage;