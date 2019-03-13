import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

const AppointmentList = (props) => {
    const appointments = props.appointments;



    function formatType(type) {

        if (type === 0) {
            type = "Walk-in";
        } else if (type === 1) {
            type = "Annual";
        }
        return type;
    }

    function formatDate(date) {
        let d = new Date(date);

        let fdate = ("0" + d.getDate().toString()).slice(-2);
        let month = ("0" + (d.getMonth() + 1).toString()).slice(-2);
        let year = d.getUTCFullYear().toString();
        let hour = ("0" + (d.getUTCHours() - 4).toString()).slice(-2);
        let minute = ("0" + d.getUTCMinutes().toString()).slice(-2);

        date = fdate + "/" +  month + "/"+ year + "  at " + hour + ":" + minute;

        return  date;
    }

    // Displaying the list of items. _id is unique to MongoDB (Primary Key)
    return (
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
                                    <td> {formatType(appointment.type)} </td>
                                    <td> {formatDate(appointment.start)} </td>
                                    <td> {appointment.duration + " minutes"} </td>
                                    <td> {appointment.price+ "$"} </td>
                                   { <td> <button onClick={{ /*LINK ACCORDINGLY() => props.deleteItem(appointment._id)*/}} type="button" className="btn btn-outline-warning">Update</button> </td>}
                                   { <td> <button onClick = { () => props.deleteItem(appointment._id) } type="button" className="btn btn-outline-danger">Delete</button> </td>}
                                </tr>
                            )
                        })
                    ) : (
                        <li> No appointments</li>
                    )
            }
            </tbody>

        </Table>
    )
}

export default AppointmentList;