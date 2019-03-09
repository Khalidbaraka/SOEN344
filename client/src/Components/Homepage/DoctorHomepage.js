import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import {Link} from "react-router-dom";
import UpdateSchedule from "../Schedule/UpdateSchedule";

class DoctorHomepage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeslots: null,
            showScheduleEditModal: false,
        };

        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
    }

    componentDidMount() {
    //    TODO get doctors timeslots and set on timeslots state
    }

    openEdit() {
        this.setState({showScheduleEditModal: true});
    }

    closeEdit() {
        this.setState({showScheduleEditModal: false});
    }

    render() {
        return (
            <div>
                <h1> Doctor Homepage </h1>

                {/* Many of these would exist, per timeslot and load the modal with the timeslot info */}
                <Button variant="primary"
                        onClick={this.openEdit}>
                    Edit
                </Button>

                <UpdateSchedule
                    show={this.state.showScheduleEditModal}
                    onHide={this.closeEdit}
                />
            </div>
        );
    }


}

export default DoctorHomepage;