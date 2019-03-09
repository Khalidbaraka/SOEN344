import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class DoctorSchedule extends Component {
    constructor() {
        super();

        this.state = {
            permitNumber: '',
            password: '',
            message: '',
            schedules: '',
            appointments: '',
            isAuthenticated: false
        }
    }

    render() {
        return (
            <div>
                <nav className="navbar-user navbar-expand-lg navbar-dark bg-dark">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <Link to={'/homepage/doctor/schedule'} className="nav-link"> My Schedule </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
        const doctor = {
            schedules: this.state.schedules,
            appointments: this.state.appointments
        };

        axios.get('api/doctors/:permit_number/schedule/get', {
            schedules: doctor.schedules,
            appointments: this.appointments

        }).then(res => {

        });
    }
}

export default DoctorSchedule;