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
            startTime: moment()
        }
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
            showSecond={false}
            minuteStep={this.props.type == "Walk-in" ? 20 : 60}
            secondStep={60}
            />;

        // rc-calendar
        const calendar = (<Calender
            showWeekNumber={false}
            disabledTime={false}
            format='YYYY-MM-DD HH:mm'
            showToday={true}
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
                                    <Col md={12}><Form.Label>Enter the date and time from which you would like the search to be performed</Form.Label></Col>
                                    <Col md={3}><Form.Control value={this.state.startTime.format("YYYY-MM-DD HH:mm")} /></Col>
                                    <Button variant="outline-info"><i className="fa fa-calendar-plus-o" aria-hidden="true"></i></Button>
                                </Form.Row>
                            </Form>
                                
                        )
                    }
                }</DatePicker>

                <Alert variant="info" className="my-4">
                    <div> Appointment Type: <span className="font-weight-bold">{this.props.type}</span> </div>
                    <div> From: <span className="font-weight-bold">{ startTime.toDate().toString() }</span> </div>
                </Alert>
            </div>
        );
    }
}

export default AppCalender;