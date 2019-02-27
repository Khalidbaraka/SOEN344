const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Add all necessary route modules here
const catalogRouter = require('./routes/api/catalog');
const patientsRouter = require('./routes/api/patients');
const doctorRouter = require('./routes/api/doctor');

const app = express();

// Bodyparser Middleware 
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(db)
    .then(() => console.log('MongoDB Connected..'))
    .catch(err => console.log(err));

// Using the route modules. Add the necessary routes to the middleware stack here
app.use('/api/catalog', catalogRouter)
app.use('/api/patients', patientsRouter)
// uncomment after implementing doctor routes 
//app.use('/api/doctor', doctorRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
