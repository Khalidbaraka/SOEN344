import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import UpdateSchedule from "../Schedule/UpdateSchedule";

import moment from 'moment';

class DoctorHomepage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeslots: [],
            selectedTimeslot: null,
            showScheduleEditModal: false,
        };

        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
    }

    componentDidMount() {
    //    TODO get doctors timeslots and set on timeslots state (for now I push 1 temp value)

        let temp = {
            doctor: null,
            start: moment().toDate(),
            end: moment().add(2, "hours").toDate(),
        };

        this.setState({ timeslots: [...this.state.timeslots, temp] });
    }

    openEdit() {
        // TODO for now always a fixed slot, but the selected ts should be passed here
        let arrayIndexGottenFromfunc = 0;
        console.log(this.state.timeslots[arrayIndexGottenFromfunc]);
        this.setState({
            selectedTimeslot: this.state.timeslots[arrayIndexGottenFromfunc],
            showScheduleEditModal: true,
        });
    }

    closeEdit() {
        this.setState({
            selectedTimeslot: null,
            showScheduleEditModal: false,
        });
    }

    render() {
        return (
            <div>
                {/*for test*/}
                <div><pre>{JSON.stringify(this.state, null, 2) }</pre></div>
                <h1> Doctor Homepage </h1>

                {/* Many of these would exist, per timeslot and load the modal with the timeslot info */}
                <Button variant="primary"
                        onClick={this.openEdit}>
                    Edit
                </Button>

                <UpdateSchedule
                    show={this.state.showScheduleEditModal}
                    onHide={this.closeEdit}
                    timeslot={this.state.selectedTimeslot}
                />
            </div>
        );
    }


}

export default DoctorHomepage;