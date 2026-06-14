const express = require('express');
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/auth.routes');
const resumeRouter=require('./routes/resume.routes');


const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Server  is  running ")
})


app.use('/api/auth', authRoutes);
app.use('/api/resume',resumeRouter)


module.exports = app;