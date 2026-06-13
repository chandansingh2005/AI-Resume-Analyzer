require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');

connectDB()

const app = express();

const PORT =process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server  is  running ")
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})