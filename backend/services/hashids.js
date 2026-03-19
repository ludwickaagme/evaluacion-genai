const Hashids = require('hashids/cjs');
const hashids = new Hashids(process.env.HASHIDS_SALT || 'default_salt', 8);

// Middleware to encode the outgoing id in the response for a specific endpoint
function encodeIdMiddleware(req, res, next) {
    // Wrap res.json to intercept the response
    const originalJson = res.json;
    res.json = function (body) {
        if (body && body.id && typeof body.id === 'number') {
            body.id = hashids.encode(body.id);
        }
        return originalJson.call(this, body);
    };
    next();
}

module.exports = {
    encodeIdMiddleware,
    hashids
};
