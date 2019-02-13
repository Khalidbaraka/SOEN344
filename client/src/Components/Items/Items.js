import React, { Component } from 'react';

import ItemInput from './ItemInput';
import ItemList from './ItemList';
import axios from 'axios';

class Items extends Component {
    constructor(props) {
        super(props);
        
        // State of the component, which is an array of items
        this.state = {
            items: []
        }
    }

    // Call getItems() when the component first render
    componentDidMount() {
        this.getItems();
    }

    /* We send the GET request to the node.js server and fetch that data from the API
    We don't need to write http://localhost:5000/api/items since we added "proxy": "http://localhost:5000" to package.json */
    getItems = () => {
        axios.get('/api/items')
        .then(res => {
          if(res.data){
            this.setState({
              items: res.data
            })
          }
        })
        .catch(err => console.log(err))
    }

    // Idem, delete the data from the API
    deleteItem = (id) => {
        axios.delete(`/api/items/` + id)
          .then(res => {
            if(res.data){
              this.getItems()
            }
          })
          .catch(err => console.log(err))
      }
    
    render() {
        // Deconstructs the state in a variable
        let { items } = this.state;

        /* Render both ItemInput and ItemList components. 
        Note: The page will only re-render if the state in the parent class changes, which is why we are passing getItems() to ItemInput.
        In ItemInput, when we post an item, the onSubmit() function is called, which in turn calls getItems() to update the state.
        */
        return (
            <div className="container">
                <h1 className="text-center my-4"> My Items </h1>
                <ItemInput getItems={this.getItems}/>
                <ItemList items={items} deleteItem={this.deleteItem}/>
            </div>
        );
    }
}

export default Items;