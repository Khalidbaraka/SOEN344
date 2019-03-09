import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DoctorHomepage extends Component {
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
}

export default DoctorHomepage;