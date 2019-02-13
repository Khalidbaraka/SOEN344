import React, { Component } from 'react';

import axios from 'axios';

class ItemInput extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            item: {
                name: '',
                date: new Date()
            }, 
            loading: false
        }
    }

    // Input Handler
    onChangeItem = (event) => {
        const nextState = {
            ...this.state,
            item: {
                ...this.state.item,
                [event.target.name]: event.target.value
            }
        };
        this.setState(nextState);
    }

    onSubmit = (event) => {
        event.preventDefault();
        const item = this.state.item;
        
        console.log(`The item is ${item.name}, entered on ${item.date}`)

        /* Send the HTTP POST request along with the form data to the node js server. 
        Send the data as an object because we have used the body-parser at 
        the backend to pluck the data from the request and save it in the database. 
        */
        if (item) {
            axios.post('/api/items', item)
            .then(res => {
                if (res.data) {
                    this.props.getItems();
                    this.setState({
                        item: ''
                    })
                }
            }).catch(err => console.log(err))
        } else {
            console.log("Input required!");
            
        }
      

        // Initialize to null
        this.setState({
            item: {
                name: '',
                date: ''
            }
        })
        
    }
    
    render() {
        return (
            <div>
                <div className="card my-5">
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group row m-2">
                                <label className="col-sm-2 col-form-label">Add an item:  </label>
                                <div className="col-sm-8">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="name"
                                        value={this.state.item.name}
                                        onChange={this.onChangeItem}
                                    />
                                </div>
                                <div className="col-sm-2">
                                    <input type="submit" value="Enter Item" className="btn btn-info"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ItemInput;