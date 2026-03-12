const logger = require("./logger");

function errorHandler(error, res) {
    let errorDate = new Date().toLocaleString("en-GB", { timeZone: "CST", hour12: true });
    logger.error(`[${errorDate}] - ${error.stack || error.message}`);
    if (error.message.includes("Duplicate entry")) {
        return res.status(409).json({ message: "Duplicate entry" });
    }
    return res.status(500).json({ message: `Internal Server Error at ${errorDate}` });
};
    
module.exports = { errorHandler };