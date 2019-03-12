import React, {Component} from 'react';
import axios from 'axios';
/* Import Components */
import Form from "react-bootstrap/es/Form";
import Input from "../Input";
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
            start: this.props.appointment.start,
            duration: this.props.appointment.duration,
            end: this.props.appointment.end,
            price: this.props.appointment.price
        };


        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

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


    render() {
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