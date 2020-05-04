const Logger = require('./anotherModule');
const logger = new Logger();

logger.on('logging', (arg) => {
    console.log("Event : logging, Data : ", arg);
});

logger.another('Aditya');