import React, { Component } from 'react';

const ItemList = (props) => {
    const items = props.items;

    // Displaying the list of items. _id is unique to MongoDB (Primary Key)
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col"> ID </th>
                    <th scope="col"> Item </th>
                    <th scope="col"> Date </th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {
                    items && items.length > 0 ? 
                    (
                        items.map(item => {
                            return (
                                <tr key={item._id}>
                                    <th> {item._id } </th>
                                    <td> {item.name} </td>
                                    <td> {item.date} </td>
                                    <td> <button onClick={() => props.deleteItem(item._id)} type="button" className="btn btn-outline-info">Delete</button> </td>
                                </tr>
                            )
                        })
                    ) : (
                        <li> No item </li>
                    )
                }
            </tbody>
          
        </table>
    )
}

export default ItemList;