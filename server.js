
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const dbconnection = require('./server/database/dbconnection');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
dbconnection();

// Middleware
app.use(bodyParser.json());

// Routes
const foodProductRoutes = require('./server/routes/router');
app.use('/api/food-products', foodProductRoutes);

// Start the server

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`)});


app.get('/api/food-products/', (req, res) => { 
    database.collection("product_collections").find({}).toArray((error,result)=>{
        res.send(result);
    })
})