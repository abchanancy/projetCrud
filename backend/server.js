let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let dbConfig = require('./database/db');
const cors = require("cors")

const corsOptions = {

    origin: 'http://localhost:3000',

    optionsSuccessStatus: 200 // for some legacy browsers

  }
// Express Route
const studentRoute = require('../backend/routes/student.route')

// Configure mongoDB Database


// Connecting MongoDB Database

const connectDB = async()=>{
    await mongoose.connect(dbConfig.db).then(() => {
        console.log('Database successfully connected!')
        },
        error => {
            console.log('Could not connect to database : ' + error)
        }
    )
}

connectDB()

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));
app.use(cors(corsOptions));
app.use('/students', studentRoute)


// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
console.log('Connected to port ' + port)
})
