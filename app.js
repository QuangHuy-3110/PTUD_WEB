const express = require('express');
const cors = require('cors');

const contactsRouter = require('./app/routes/contact.route');

const ApiError = require('./app/api-error');
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

//handle 404 response
app.use((req, res, next) => {
    //code se chay khi khong co route duoc dinh nghia nao
    //khop yeu cau goi next() de chuyen sang middleware xu ly loi
    return next(new ApiError(404, 'Resource not found'));
});

// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    //Middleware xu ly loi tap trung 
    // Trong doan code xu ly o cac route, goi next(err) se chuyen ve middleware xu ly loi nay
    return res.status(Error.status || 500).json({
        message: Error.message || 'Internal Server Error',
    });
});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to contact book application' });
});

app.use('/api/contacts', contactsRouter);

module.exports = app;