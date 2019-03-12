import React, {Component} from 'react';
import axios from 'axios';
/* Import Components */
import Form from "react-bootstrap/es/Form";
import AppCalender from './AppCalender';
import Input from "../Input";
import 'rc-time-picker/assets/index.css';

import { Alert, Button, Col, Row } from 'react-bootstrap';

import Calender from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import moment from 'moment';







class ModifyAppointment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appointment: this.props.appointment,
            dateCreated: this.props.appointment.dateCreated,
            type: this.props.appointment.type,
            clinic: this.props.appointment.clinic,
            doctor: this.props.appointment.doctor,
            patient: this.props.appointment.patient,
            room:this.props.appointment.room,
            start: moment().startOf('day'),
            duration: this.props.appointment.duration,
            price: this.props.appointment.price
        };


        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    componentDidMount = () => {
        console.log("START", this.state.start);

    }


    handleFormSubmit= (e) => {
        // Form submission logic

        e.preventDefault();

        const updatedAppointment = {
            dateCreated: this.state.dateCreated,
            type: this.state.type,
            clinic: this.state.clinic,
            doctor: this.state.doctor,
            patient: this.state.patient,
            room: this.state.room,
            start: this.state.start,
            duration: this.state.duration,
            end: this.state.end,
            price: this.state.price
        };

        axios.post('api/modifyApt', {
            dateCreated: updatedAppointment.dateCreated,
            type: updatedAppointment.type,
            clinic: updatedAppointment.clinic,
            doctor: updatedAppointment.doctor,
            patient: updatedAppointment.patient,
            room: updatedAppointment.room,
            start: updatedAppointment.start,
            duration: updatedAppointment.duration,
            end: updatedAppointment.end,
            price: updatedAppointment.price
        })

    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onAppointmentTypeHandler = (event) => {
        this.setState({
            type: event.target.value
        })
    }

    disabledHours = () => {
        return [0, 1, 2, 3, 4, 5, 6, 7, 21, 22, 23];
    }

    disabledMinutes = () => {

        if (this.state.start.toDate().getHours() == 0) {
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

    onChangeTime = (value) => {

        console.log("Moment", value.toDate());

        const nextState = {
            ...this.state,
            start: value
        };

        this.setState(nextState);
    }


    test = () => {
        console.log("CLICKING")
    }


    render() {
        const { type, start } = this.state;

        const timePickerElement = <TimePickerPanel
            format='HH:mm'
            defaultValue={moment().startOf('day')}
            disabledHours={this.disabledHours}
            disabledMinutes={this.disabledMinutes}
            disabledSeconds={this.disabledSeconds}
            minuteStep={type == "0" ? 20 : 60}
        />;

        // rc-calendar
        const calendar = (<Calender
            showWeekNumber={false}
            disabledTime={false}
            disabledDate={this.disabledDate}
            format='YYYY-MM-DD HH:mm'
            timePicker={timePickerElement}
            showOk={true}
            value={start}
            onChange={this.onChangeTime}
            showDateInput={false}
        />);


        return (
            <div>
                <h1>Modify Appointment</h1>
                <br/>
                <form className="container" onSubmit={this.handleFormSubmit}>
                    <Input type={'text'}
                           title= {'Type'}
                           name= {'name'}
                           value={this.state.type}
                           placeholder = {'Enter your name'}
                           onChange={this.onChange} required
                    />

                    <Input type={'text'}
                           title= {'Doctor'}
                           name= {'name'}
                           value={this.state.doctor}
                           placeholder = {'Enter your name'}
                           onChange={this.onChange} required
                    />
                    <Input type={'text'}
                           title= {'Room Number'}
                           name= {'name'}
                           value={this.state.room}
                           placeholder = {'Enter your name'}
                           onChange={this.onChange} required
                    />
                    <Input type={'text'}
                           title= {'Start Time'}
                           name= {'name'}
                           value={this.state.start}
                           placeholder = {'Enter your name'}
                           onChange={this.onChange} required
                    />
                    <Input type={'text'}
                           title= {'End Time'}
                           name= {'name'}
                           value={this.state.end}
                           placeholder = {'Enter your name'}
                           onChange={this.onChange} required
                    />
                    <Input type={'text'}
                           title= {'Duration'}
                           name= {'name'}
                           value={this.state.duration}
                           placeholder = {'Enter your name'}
                           onChange={this.onChange} required
                    />

                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Select an appointment type</Form.Label>
                                <Form.Control as="select" onChange={this.onAppointmentTypeHandler} value={type}>
                                    <option value="0"> Walk-in </option>
                                    <option value="1"> Annual </option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                    </Form>


                    <div classNameName="my-4">
                        <DatePicker
                            animation="slide-up"
                            calendar={calendar}
                        >
                            {
                                ({start}) => {
                                    return (
                                        <Form>
                                            <Form.Row noGutters={true}>
                                                <Col md={12}><Form.Label>Please select date and time of appointment</Form.Label></Col>
                                                <Col md={3}><Form.Control disabled={true} value={this.state.start.format("YYYY-MM-DD HH:mm")} /></Col>
                                                <Button onClick={this.test} variant="outline-info"><i className="fa fa-calendar-plus-o" aria-hidden="true"></i></Button>
                                            </Form.Row>
                                        </Form>

                                    )
                                }
                            }</DatePicker>

                        <Alert variant="info" className="my-4">
                            <div> Appointment Type:
                                <span className="font-weight-bold">
                            {this.state.type == 0 ? " Walk-in " : " Annual " }
                        </span>
                            </div>
                            <div> For: <span className="font-weight-bold">{ start.toDate().toString() }</span> </div>
                        </Alert>
                    </div>


                    <button
                        action={this.handleFormSubmit}
                        type={"primary"}
                        title={"Submit"}
                        style={buttonStyle}
                        onChange={this.onChange} required
                    />{" "}
                </form>
            </div>

        );

    }}

export default ModifyAppointment;
const buttonStyle = {
    margin: "10px 10px 10px 10px"
};