import React, { Component } from 'react';

const AppointmentList = (props) => {
    const appointments = props.appointments;

    // Displaying the list of items. _id is unique to MongoDB (Primary Key)
    return (
        <table className="table">
            <thead>
            <tr>
                <th scope="col"> Doctor </th>
                <th scope="col"> Type </th>
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

        </table>
    )
}

export default AppointmentList;