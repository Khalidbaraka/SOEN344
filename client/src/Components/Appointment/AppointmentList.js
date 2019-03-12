import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { Table } from 'react-bootstrap';

class AppointmentList extends Component {
    constructor(props) {
        super(props);
        
    }

    formatType = (duration) => {

        let type = '';
 
        if (duration == 20) {
            type = "Walk-in";
        } else if (type == 60) {
            type = "Annual";
        }
        return type;
    }
 
    formatDate = (date) => {
            let d = new Date(date);
 
            let fdate = ("0" + d.getDate().toString()).slice(-2);
            let month = ("0" + (d.getMonth() + 1).toString()).slice(-2);
            let year = d.getUTCFullYear().toString();
            let hour = ("0" + (d.getUTCHours() - 4).toString()).slice(-2);
            let minute = ("0" + d.getUTCMinutes().toString()).slice(-2);
 
            date = fdate + "/" +  month + "/"+ year + "  at " + hour + ":" + minute;
 
        return  date;
    }
    
    render() {

        let appointments = this.props.appointments;
       
        return (
            <div>                
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th scope="col"> Doctor </th>
                        <th scope="col"> Type </th>
                        <th scope="col"> Date </th>
                        <th scope="col"> Duration </th>
                        <th scope="col"> Price </th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        appointments && appointments.length > 0 ?
                            (
                                appointments.map(appointment => {
                                    return (
                                        <tr key={appointment._id}>
                                            <th> {appointment.doctor } </th>
                                            <td> {this.formatType(appointment.duration)} </td>
                                            <td> {this.formatDate(appointment.start)} </td>
                                            <td> {appointment.duration + " minutes"} </td>
                                            <td> {appointment.duration+ "$"} </td>
                                            <td> <button onClick={() => this.props.onUpdateAppointment(appointment)} type="button" className="btn btn-outline-warning">Update</button> </td>
                                           { <td> <button onClick={{/*LINK ACCORDINGLY() => props.deleteItem(appointment._id)*/}} type="button" className="btn btn-outline-danger">Delete</button> </td>}
                                        </tr>
                                    )
                                })
                            ) : (
                                <li> No appointments</li>
                            )
                    }
                    </tbody>
        
                </Table>
            </div>
        )
    }
}

export default AppointmentList;


