import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class DoctorHomepage extends Component {

    render() {
        return (
<<<<<<< HEAD
            <div>
               <nav className="navbar-user navbar-expand-lg navbar-dark bg-dark">
               <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                      <Link to={'/homepage/doctor/schedule'} className="nav-link"> My Schedule </Link>
                    </li>
                    </ul>
               </nav>
            </div>
=======
                <div>
                    <h1> Doctor Homepage </h1>
                </div>
>>>>>>> 8acac870ba192e5506b1c49b20c49e110c913db6
        );
    }
}

export default DoctorHomepage;