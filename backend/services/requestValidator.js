const { validationResult } = require('express-validator');
const logger = require('./logger');

function requestValidator(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn(`Request validation failed: ${JSON.stringify(errors.array())}`);
        return res.status(401).json({ message: 'Missing or invalid request data' });
    }
    next();
}

module.exports = requestValidator;