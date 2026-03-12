const winston = require('winston');
const path = require('path');
const fs = require('fs');

const logsDir = './logs';
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}
const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
);

const consoleFormat = winston.format.combine(
    winston.format.timestamp({ 
        format: () => {
            const timezone = 'America/Mexico_City';
            const now = new Date();
            const formatted = now.toLocaleString('en-US', {
                timeZone: timezone,
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            return formatted.replace(/,/, '');
        }
    }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
        const colors = {
            info: '\x1b[36m',    // Cyan
            warn: '\x1b[33m',    // Yellow
            error: '\x1b[31m',   // Red
            debug: '\x1b[35m',   // Magenta
            reset: '\x1b[0m'
        };
        
        const levelName = level.toUpperCase().padEnd(2);
        const color = colors[level] || colors.reset;
        
        let msg = `${color}${levelName}${colors.reset} | ${message} ${colors.reset}(${timestamp})`;
        
        if (Object.keys(meta).length > 0) {
            const filtered = Object.keys(meta)
                .filter(key => !['timestamp', 'level', 'message'].includes(key))
                .reduce((obj, key) => ({ ...obj, [key]: meta[key] }), {});
            
            if (Object.keys(filtered).length > 0) {
                msg += `\n      ${JSON.stringify(filtered)}`;
            }
        }
        
        return msg;
    })
);

const transports = [];

transports.push(
    new winston.transports.Console({
        format: consoleFormat,
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info'
    })
);

transports.push(
    // Error log
    new winston.transports.File({
        filename: path.join(logsDir, 'error.log'),
        level: 'error',
        format: logFormat,
        maxsize: 10485760, // 10MB
        maxFiles: 5
    }),
    
    // Combined log
    new winston.transports.File({
        filename: path.join(logsDir, 'combined.log'),
        format: logFormat,
        maxsize: 10485760, // 10MB
        maxFiles: 14
    }),
    
    // Security audit log
    new winston.transports.File({
        filename: path.join(logsDir, 'security.log'),
        level: 'warn',
        format: logFormat,
        maxsize: 10485760,
        maxFiles: 30
    })
);

// Create logger
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: logFormat,
    transports,
    exitOnError: false
});

logger.stream = {
    write: (message) => {
        const trimmed = message.trim();
        
        const cyan = '\x1b[36m';
        const green = '\x1b[32m';
        const yellow = '\x1b[33m';
        const red = '\x1b[31m';
        const reset = '\x1b[0m';

        const statusMatch = trimmed.match(/(^|\s)(\d{3})(\s|$)/);
        let statusColor = reset;
        let statusCode = null;

        if (statusMatch) {
            const status = parseInt(statusMatch[2]);
            statusCode = statusMatch[2];
            if (status >= 500) statusColor = red;
            else if (status >= 400) statusColor = yellow;
            else if (status >= 300) statusColor = cyan;
            else if (status >= 200) statusColor = green;
        }
        let colored = trimmed
            .replace(/\b(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)\b/g, `${cyan}$1${reset}`);

        if (statusCode) {
            const statusRegex = new RegExp(`(^|\\s)${statusCode}($|\\s)`);
            colored = colored.replace(statusRegex, `$1${statusColor}${statusCode}${reset}$2`);
        }
        
        console.log(`${cyan}HTTP ${reset}| ${colored}`);
    }
};

// Helper methods
logger.logSecurity = (event, details) => {
    logger.warn('SECURITY_EVENT', {
        event,
        ...details,
        timestamp: new Date().toISOString()
    });
};

logger.logTransaction = (type, details) => {
    logger.info('TRANSACTION', {
        type,
        ...details,
        timestamp: new Date().toISOString()
    });
};

logger.logAudit = (action, user, details) => {
    logger.info('AUDIT', {
        action,
        user,
        ...details,
        timestamp: new Date().toISOString()
    });
};

module.exports = logger;
