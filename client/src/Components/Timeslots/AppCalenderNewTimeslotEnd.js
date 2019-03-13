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

        this.state = {
            endDate: moment().startOf('day'),

        }
    }

    disabledHours = () => {
        return [0, 1, 2, 3, 4, 5, 6, 7, 21, 22, 23];
    }


    disabledSeconds = (h, m) => {
        const arraySeconds = [];
        let i = 0;
        while (i <= 60) {
            arraySeconds.push(i);
            i++;
        }

        return arraySeconds
    }

    onChange = (value) => {
        this.props.onChange(value);
        console.log("Moment END:" + value.toDate());


        const nextState = {
            ...this.state,
            endDate: value,
        };

       

        this.setState(nextState);

    }


    render() {

        const { endDate } = this.state

        // rc-time-picker Panel
        const timePickerElement = <TimePickerPanel
            format='HH:mm'
            defaultValue={moment().startOf('day')}
            disabledHours={this.disabledHours}
            disabledMinutes={this.disabledMinutes}
            disabledSeconds={this.disabledSeconds}
            minuteStep={this.props.type == "0" ? 20 : 60}
        />;

        // rc-calendar
        const calendar = (<Calender
            showWeekNumber={false}
            disabledTime={false}
            format='YYYY-MM-DD HH:mm'
            showToday={true}
            timePicker={timePickerElement}
            showOk={true}
            value={endDate}
            onChange={this.onChange}
            showDateInput={false}
        />);

        return (
            <div classNameName="my-4">
                <DatePicker
                    animation="slide-up"
                    calendar={calendar}
                >
                    {
                        ({endDate}) => {
                            return (
                                <Form>
                                    <Form.Row noGutters={true}>
                                        <Col md={12}><Form.Label>Please select the end of the timeslot</Form.Label></Col>
                                        <Col md={3}><Form.Control value={this.state.endDate.format("YYYY-MM-DD HH:mm")} /></Col>
                                        <Button variant="outline-info"><i className="fa fa-calendar-plus-o" aria-hidden="true"></i></Button>
                                    </Form.Row>
                                </Form>

                            )
                        }
                    }</DatePicker>

                {/*<Alert variant="info" className="my-4">*/}
                    {/*<div> Appointment Type:*/}
                        {/*<span className="font-weight-bold">*/}
                            {/*{this.props.type == 0 ? " Walk-in " : " Annual " }*/}
                        {/*</span>*/}
                    {/*</div>*/}
                    {/*<div> For: <span className="font-weight-bold">{ endDate.toDate().toString() }</span> </div>*/}
                {/*</Alert>*/}
            </div>
        );
    }
}

export default AppCalender;