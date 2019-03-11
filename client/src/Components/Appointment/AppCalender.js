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
            startTime: moment().startOf('day')
        }
    }

    disabledHours = () => {
        return [0, 1, 2, 3, 4, 5, 6, 7, 21, 22, 23];
    }

    disabledMinutes = () => {
        
        if (this.state.startTime.toDate().getHours() == 0) {
            return [0, 20, 40];
        }
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

    disabledDate = (current) => {
        const date = new Date();
        
        // Can not select days before today
        return current.isBefore(date.setDate(date.getDate() - 1));
    }

    onChange = (value) => {       
        console.log("Moment", value.toDate());
        
        const nextState = {
            ...this.state,
            startTime: value
        };
        
        this.setState(nextState);           
    }
    
    render() {

        const { startTime } = this.state

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
            disabledDate={this.disabledDate}
            format='YYYY-MM-DD HH:mm'
            timePicker={timePickerElement}
            showOk={true}
            value={startTime}
            onChange={this.onChange}
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
                                    <Col md={3}><Form.Control disabled={true} value={this.state.startTime.format("YYYY-MM-DD HH:mm")} /></Col>
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