import 'rc-time-picker/assets/index.css';

import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import React, { Component } from 'react';

import Calender from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import moment from 'moment';

class AppCalender extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        const { startTime } = this.props

        // rc-time-picker Panel
        const timePickerElement = <TimePickerPanel 
            format='HH:mm'
            defaultValue={moment().startOf('day')}
            disabledHours={this.props.disabledHours}
            disabledMinutes={this.props.disabledMinutes}
            disabledSeconds={this.props.disabledSeconds}
            minuteStep={this.props.type == "0" ? 20 : 60}
            />;

        // rc-calendar
        const calendar = (<Calender
            showWeekNumber={false}
            disabledTime={false}
            disabledDate={this.disabledDate}
            format='YYYY-MM-DD HH:mm'
            timePicker={timePickerElement}
            showOk={true}
            value={startTime}
            onChange={this.props.onChange}
            showDateInput={false}
            />);

        return (
            <div classNameName="my-4">
                <DatePicker
                    animation="slide-up"
                    calendar={calendar}
                >
                {
                    ({startTime}) => {
                        return (
                            <Form>
                                <Form.Row noGutters={true}>
                                    <Col md={12}><Form.Label>Please select date and time of appointment</Form.Label></Col>
                                    <Col md={3}><Form.Control disabled={true} value={this.props.startTime.format("YYYY-MM-DD HH:mm")} /></Col>
                                    <Button variant="outline-info"><i className="fa fa-calendar-plus-o" aria-hidden="true"></i></Button>
                                </Form.Row>
                            </Form>
                                
                        )
                    }
                }</DatePicker>

                <Alert variant="info" className="my-4">
                    <div> Appointment Type: 
                        <span className="font-weight-bold">
                            {this.props.type == 0 ? " Walk-in " : " Annual " }
                        </span> 
                    </div>
                    <div> For: <span className="font-weight-bold">{ startTime.toDate().toString() }</span> </div>
                </Alert>
            </div>
        );
    }
}

export default AppCalender;