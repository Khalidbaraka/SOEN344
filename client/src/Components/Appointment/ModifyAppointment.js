import React, {Component} from 'react';
import axios from 'axios';
/* Import Components */
import Input from '../Input';
import Button from '../Button';
import Form from "react-bootstrap/es/Form";

class FormContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appointment: this.props.appointment,
            dateCreated: "2019-03-10",
            type: "60 mins",
            clinic: "yoyo",
            doctor: "Jason",
            patient: "kelly",
            room:"1",
            start: "2020-03-01-12:00",
            duration: "60 mins",
            end: "2019-03-01-1:00",
            price: "12"
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

                    <Button
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

export default FormContainer;
const buttonStyle = {
    margin: "10px 10px 10px 10px"
}; 