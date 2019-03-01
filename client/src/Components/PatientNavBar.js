import React, { Component } from 'react'
import {Link} from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class PatientNavBar extends Component{

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render(){

        return(
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <a className="navbar-brand" href="landing.html">Profile</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            Appointment
                        </DropdownToggle>
                        <DropdownMenu>

                            <DropdownItem> <Link to="/patientMyApp">My Appointment</Link></DropdownItem>
                            <DropdownItem> <Link to="/patientScheduleApp">Schedule Appointment</Link></DropdownItem>

                        </DropdownMenu>
                    </Dropdown>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/singOut">Sign Out</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )

    }

}

export default PatientNavBar;