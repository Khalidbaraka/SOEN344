const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');

const app = express();

// Bodyparser Middleware 
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(db)
    .then(() => console.log('MongoDB Connected..'))
    .catch(err => console.log(err));

// Use routes
app.use('/api/items', items)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port ${PORT}'));