
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orders = require('./api/routes/orders');

mongoose.connect('mongodb://Slavco:Slavick04@api-shard-00-00-yskco.mongodb.net:27017,api-shard-00-01-yskco.mongodb.net:27017,api-shard-00-02-yskco.mongodb.net:27017/test?ssl=true&replicaSet=API-shard-0&authSource=admin');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method ==='OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.use('/products', productRoutes);
app.use('/orders', orders);

app.use((req, res, next) => {
    const error = new Error("nu such route exists");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;
