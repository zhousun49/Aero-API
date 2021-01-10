const express = require('express')
const app = express();
// Setup server port
require("dotenv").config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const ProjectRoute = require('./router/project')
const UserRoute = require('./router/user')
const PaymentRoute = require('./router/payment')

const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
// console.log(stripePublicKey, stripeSecretKey)

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
app.get('/', (req, res) => res.send('Welcome using Aero API beta version'));
app.use('/api',ProjectRoute)
app.use('/api',UserRoute)
app.use('/api',PaymentRoute)
// Launch app to listen to specified port

const port = process.env.PORT || 5000;
app.listen(port, ()=> {
    console.log('API running at: ', port)
});