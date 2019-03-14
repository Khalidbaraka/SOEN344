import { Button, Table } from 'react-bootstrap';
import React, { Component } from 'react';

class AppointmentList extends Component {
    constructor(props) {
        super(props);
    }

    formatType = (duration) => {
        let type = '';
        console.log("Duration", duration);
        
        
        if (duration === "20") {
            type = "Walk-in";
        } else {
            type = "Annual";
        }
        console.log("Type", type);
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

    render (){

    let appointments = this.props.appointments;
    // Displaying the list of items. _id is unique to MongoDB (Primary Key)
    return (
        <div>
            <Table responsive striped bordered hover variant="dark" className="text-center my-0">
                    <thead>
                        <tr>
                            <th scope="col"> Doctor </th>
                            <th scope="col"> Type </th>
                            <th scope="col"> Room N° </th>
                            <th scope="col"> Date </th>
                            <th scope="col"> Duration </th>
                            <th scope="col"> Price </th>
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
                                    <td> {appointment.room} </td>
                                    <td> {this.formatDate(appointment.start)} </td>
                                    <td> {appointment.duration + " minutes"} </td>
                                    <td> {appointment.duration+ "$"} </td>
                                    <td> 
                                        <Button 
                                            onClick={() => this.props.onUpdateAppointment(appointment)}  
                                            type="button" 
                                            variant="outline-warning"
                                            size="sm">
                                            Update
                                        </Button> 
                                    </td>
                                    <td>
                                        <Button 
                                            onClick = {() => this.props.deleteItem(appointment._id)} 
                                            type="button" 
                                            variant="outline-danger"
                                            size="sm">
                                            Delete
                                        </Button> 
                                    </td>
                                </tr>
                            )
                        })
                    ) : (
                        <td colSpan="8"> <div className="my-3 font-weight-bold">No Appointment</div> </td>
                    )
            }
            </tbody>

        </Table>
     </div>
    )}
}

export default AppointmentList;