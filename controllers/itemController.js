// Item Model 
const Item = require('./../models/Item');

//  Callback functions that they will invoke on our routes

// Display list of all items.
exports.item_list = (req, res) => {
    Item.find().then(items => res.json(items))
}


exports.item_create_post = (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save()
        .then(item => res.json(item));
}

exports.item_delete_post = (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove()
        .then(() => res.json({success: true}))
    ).catch(err => res.status(404).json({success: false}));
}