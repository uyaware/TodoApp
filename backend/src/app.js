const express = require('express');
require('dotenv').config();
const cors = require('cors');
const router = require('./routes/index');

const app = express();

// 1.Init Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Init Database
require('./dbs/init.mongodb')

// 3. Init routes
app.use('/', router);

// 4. Xử lý Lỗi 404 Not Found 
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// 5. TẦNG QUẢN LÝ LỖI TẬP TRUNG
app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    if (statusCode === 500) {
        console.error('SYSTEM ERROR:', error);
    }
    
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error'
    });
});

module.exports = app;