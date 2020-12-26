const express = require('express')
const app = express();
// Setup server port
require("dotenv").config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const ProjectRoute = require('./router/project')
const UserRoute = require('./router/user')

mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true, 
        useFindAndModify: false 
    }).then(() => console.log('DB Connected'))
    .catch(err=> {
        console.log('Err: ', err)
    });

// let port = app.listen(5000);
// Send message for default URL
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => res.send('Hello World with Express'));
app.use('/api',ProjectRoute)
app.use('/api',UserRoute)
// Launch app to listen to specified port

const port = process.env.PORT || 5000;
app.listen(port, ()=> {
    console.log('API running at: ', port)
});