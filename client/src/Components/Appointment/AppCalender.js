import 'rc-time-picker/assets/index.css';

import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import React, { Component } from 'react';

import Calender from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import moment from 'moment';

const format = 'YYYY-MM-DD HH:mm';
const momentTz = require('moment-timezone');




class AppCalender extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            value: "",
        }
    }

    componentDidMount = () => {
        console.log(momentTz().tz("America/Los_Angeles").format());
        
    }
    
    getFormat = (time) => {
        return time ? format : 'YYYY-MM-DD';
    }

    onChange = (value) => {
        const momentDateTz = momentTz.tz(value,'YYYY-MM-DD HH:mm', "America/Toronto")
        const momentDate = moment(value,'YYYY-MM-DD HH:mm')
        this.setState({
            value: momentDateTz
        });            
        console.log("Moment", this.state.value._d);
        
    }
    
    render() {
        const timePickerElement = <TimePickerPanel 
            format='HH:mm'
            showSecond={false}
            minuteStep={this.props.type == "Walk-in" ? 20 : 60}
            secondStep={60} />;

        const calendar = (<Calender
            showWeekNumber={false}
            disabledTime={false}
            format={this.getFormat(true)}
            showToday={true}
            timePicker={timePickerElement}
            showOk={true}
            value={this.state.value}
            onChange={this.onChange}
            />);


        return (
            <div classNameName="my-4">
                <Alert variant="info">
                    Appointment Type: {this.props.type}
                </Alert>
                <DatePicker
                    animation="slide-up"
                    calendar={calendar}
                >
                {
                    ({value}) => {
                        return (
                            <Form>
                                <Form.Row noGutters={true}>
                                    <Col md={12}><Form.Label>Enter the date and time from which you would like the search to be performed</Form.Label></Col>
                                    <Col md={3}><Form.Control value={value ? value.format('YYYY-MM-DD HH:mm') : ''}/></Col>
                                    <Button><i className="fa fa-calendar-plus-o" aria-hidden="true"></i></Button>
                                </Form.Row>
                            </Form>
                                
                        )
                    }
                }</DatePicker>
            </div>
        );
    }
}

export default AppCalender;