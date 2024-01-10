const express = require('express');
const mongoose = require('mongoose');

const todoHandler = require('./router/todoHandler');
const userHandler = require('./router/userHandler');
// initialize app
const app = express();
app.use(express.json());

// connect database
mongoose
    .connect('mongodb://localhost/todos')
    .then(() => console.log('database connected'))
    .catch((err) => console.log(err));

// app routes
app.use('/todo', todoHandler);
app.use('/user', userHandler);

// default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}

// start server
app.listen(3000, () => {
    console.log('server connected');
});
