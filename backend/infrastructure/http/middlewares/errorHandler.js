// src/infrastructure/http/middlewares/errorHandler.js
// ОБРАБОТЧИК ОШИБОК: перехватывает ошибки и отдает в JSON

function errorHandler(err, req, res, next) {
    // Логируем ошибку в консоль (в продакшене отправлять в лог-сервис)
    console.error('ERROR:', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method
    });

    // Определяем статус код на основе ошибки
    let statusCode = 500;
    let errorMessage = 'Внутренняя ошибка сервера';

    // Ошибки валидации (400)
    if (err.message.includes('Email должен содержать')) {
        statusCode = 400;
        errorMessage = err.message;
    }

    if (err.message.includes('Email слишком короткий')) {
        statusCode = 400;
        errorMessage = err.message;
    }

    // Ошибка "не найдено" (404)
    if (err.message.includes('не найден')) {
        statusCode = 404;
        errorMessage = err.message;
    }

    // Ошибки Sequelize (БД)
    if (err.name === 'SequelizeUniqueConstraintError') {
        statusCode = 409;
        errorMessage = 'Такой email уже существует';
    }

    if (err.name === 'SequelizeValidationError') {
        statusCode = 400;
        errorMessage = err.errors.map(e => e.message).join(', ');
    }

    // Отдаем ошибку в JSON
    res.status(statusCode).json({
        success: false,
        error: errorMessage,
        timestamp: new Date().toISOString()
    });
}

module.exports = errorHandler;