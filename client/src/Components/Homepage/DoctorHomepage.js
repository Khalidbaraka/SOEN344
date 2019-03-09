import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class DoctorHomepage extends Component {

    constructor(){
        super();

        this.state={
            permitNumber: '',
            appointments: '',
            schedules: '',
            isAuthenticated: true
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
    }

    componentDidMount() {
        const doctor = {
            permitNumber: this.state.permitNumber,
            schedules: this.state.schedules,
            appointments: this.state.appointments
        };
        const AuthStr = 'Bearer '.concat(localStorage.getItem("token"));
        axios.get(`/api/doctors/${3333333}/schedule/get`, {
                headers: {Authorization: AuthStr},
                schedules: doctor.schedules,
                appointments: this.appointments
            }
        ).then(res =>
            console.log(AuthStr)
        ).catch(err =>
            console.log(AuthStr)
        )
    }
}

export default DoctorHomepage;