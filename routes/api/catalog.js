const express = require('express');
const router = express.Router();

// Require controller modules.

const item_controller = require('./../../controllers/itemController');

// @route GET api/items
// @desc Get All items
// @access Public
router.get('/item', item_controller.item_list);

// @route POST api/items
// @desc Insert an item
// @access Public

router.post('/item/create', item_controller.item_create_post);

// @route DELETE api/items/:id
// @desc Delete an item
// @access Public
router.delete('/item/:id/delete', item_controller.item_delete_post);



module.exports = router;