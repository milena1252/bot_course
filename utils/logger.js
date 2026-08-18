const log = (level, message, data = '') => {
    const timestamp = new Date().toISOString();

    console.log(
        `[${timestamp}] [${level}] ${message}`,
        data
    );
};

const logger = {
    info: (message, data) => log('INFO', message, data),
    error: (message, data) => log('ERROR', message, data),
    warn: (message, data) => log('WARN', message, data),
};

module.exports = logger;