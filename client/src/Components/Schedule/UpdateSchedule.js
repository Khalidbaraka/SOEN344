import React from 'react';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";

import moment from 'moment';

class UpdateSchedule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: "",
        };

        this.dateChange = this.dateChange.bind(this);
        this.onOpen = this.onOpen.bind(this);
    }

    onOpen() {
        this.setState({date: moment(this.props.timeslot.start).format(moment.HTML5_FMT.DATE)});
    }

    getDate() {
        return moment(this.props.timeslot.start).format(moment.HTML5_FMT.DATE);
    }

    dateChange(event) {
        this.setState({date: event.target.value});
    }

    render() {
        return (
            <div>
                {/*for test*/}
                <div><pre>{JSON.stringify(this.props, null, 2) }</pre></div>
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
                                value={this.state.date}
                                onChange={this.dateChange}
                            />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        Footer
                    </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default UpdateSchedule;