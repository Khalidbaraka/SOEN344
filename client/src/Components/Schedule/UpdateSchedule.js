import React from 'react';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";


class UpdateSchedule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timeslot: null,
        };
    }

    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.onHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Schedule Timeslot</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Body
                    </Modal.Body>

                    <Modal.Footer>
                        Footer
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default UpdateSchedule;