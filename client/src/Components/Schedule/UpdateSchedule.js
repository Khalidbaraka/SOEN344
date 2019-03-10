import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import moment from 'moment';
import TimeRangeSlider from 'react-time-range-slider';

class UpdateSchedule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: "",
            timeRange: {
                start: "08:00",
                end: "20:00"
            },
        };

        this.dateChangeHandler = this.dateChangeHandler.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.timeChangeHandler = this.timeChangeHandler.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    onOpen() {
        let initialTimeRange = {
            start: moment(this.props.timeslot.start).format("HH:mm"),
            end: moment(this.props.timeslot.end).format("HH:mm"),
        };

        this.setState({
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

    submitForm() {
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
                        <Modal.Title>Edit Schedule Timeslot</Modal.Title>
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
                        <Button
                            type="submit"
                            onClick={this.submitForm}
                        >
                            Submit
                        </Button>
                    </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default UpdateSchedule;