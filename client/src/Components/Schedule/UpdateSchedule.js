import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import TimeRangeSlider from 'react-time-range-slider';

import moment from 'moment';
import axios from "axios";

class UpdateSchedule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            date: "",
            timeRange: {
                start: "08:00",
                end: "20:00"
            },
        };

        this.dateChangeHandler = this.dateChangeHandler.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.timeChangeHandler = this.timeChangeHandler.bind(this);
        this.modifyTimeslot = this.modifyTimeslot.bind(this);
        this.deleteTimeslot = this.deleteTimeslot.bind(this);
    }

    onOpen() {
        let initialTimeRange = {
            start: moment(this.props.timeslot.start).format("HH:mm"),
            end: moment(this.props.timeslot.end).format("HH:mm"),
        };

        this.setState({
            id: this.props.timeslot.id,
            date: moment(this.props.timeslot.start).format(moment.HTML5_FMT.DATE),
            timeRange: initialTimeRange,
        });
    }

    dateChangeHandler(event) {
        this.setState({date: event.target.value});
    }

    timeChangeHandler(time){
        this.setState({
            timeRange: time
        });
    }

    modifyTimeslot() {
        // todo do stuff with response

        let startDate = moment(this.state.date + ' ' + this.state.timeRange.start).toDate();
        let endDate = moment(this.state.date + ' ' + this.state.timeRange.end).toDate();

        let data = {
            id: this.state.id,
            start: startDate,
            end: endDate,
        };
        
        axios.put('/api/doctors/schedule/update', data).then(res => {
            console.log('res', res);
        }).catch(err => {
            console.log('error', err);
        })
    }

    deleteTimeslot() {
    //    TODO: submit the form
    }

    render() {
        return (
            <div>
                <Modal
                    show={this.props.show}
                    onHide={this.props.onHide}
                    onEnter={this.onOpen}
                    centered
                >
                    <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Selected Timeslot</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                placeholder="Date"
                                min={moment().format(moment.HTML5_FMT.DATE)}
                                value={this.state.date}
                                onChange={this.dateChangeHandler}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Start/End Time</Form.Label>
                            <div className="time-range">
                                {this.state.timeRange.start} - {this.state.timeRange.end}
                            </div>
                            <TimeRangeSlider
                                format={24}
                                minValue={"08:00"}
                                maxValue={"20:00"}
                                name={"time_range"}
                                onChange={this.timeChangeHandler}
                                step={20}
                                value={this.state.timeRange}/>
                        </Form.Group>
                    </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" type="submit" onClick={this.deleteTimeslot}>
                                Delete
                            </Button>
                            <Button onClick={this.modifyTimeslot}>
                                Modify
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default UpdateSchedule;