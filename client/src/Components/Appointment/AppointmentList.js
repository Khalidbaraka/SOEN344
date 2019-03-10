import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

const AppointmentList = (props) => {
    const appointments = props.appointments;


    

    //formatting appointment data
    for(let i = 0; i < appointments.length; i++){

        appointments[i].duration += " minutes";
        appointments[i].price += "$";

        let d = new Date(appointments[i].start);

        let date = ("0" + d.getDate().toString()).slice(-2);
        let month = ("0" + (d.getMonth() + 1).toString()).slice(-2);
        let year = d.getUTCFullYear().toString();
        let hour = ("0" + d.getUTCHours().toString()).slice(-2);
        let minute = ("0" + d.getUTCMinutes().toString()).slice(-2);

        appointments[i].start = date + "/" +  month + "/"+ year + "  at " + hour + ":" + minute;

        if(appointments[i].type === 0){
            appointments[i].type = "Walk-in";
        }
        else if(appointments[i].type === 1){
            appointments[i].type = "Annual";
        }
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
                                    <td> {appointment.type} </td>
                                    <td> {appointment.start} </td>
                                    <td> {appointment.duration} </td>
                                    <td> {appointment.price} </td>
                                   {/* <td> <button onClick={() => props.deleteItem(item._id)} type="button" className="btn btn-outline-info">Delete</button> </td>*/}
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