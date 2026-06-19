const express = require('express');
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/auth.routes');
const resumeRouter = require('./routes/resume.routes');
const analysisRouter = require('./routes/analysis.routes');

const app = express();
const cors = require('cors');

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Server  is  running ")
})


app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRouter)
app.use('/api/analysis', analysisRouter);

// Error Handler
app.use((err, req, res, next) => {
    return res.status(400).json({
        message: err.message
    });
});


module.exports = app;