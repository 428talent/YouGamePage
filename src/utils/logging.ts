import {createLogger,transports,format} from 'winston'


export const Logger = createLogger({
    level: 'info',
    transports: [
        new transports.Console()
    ]
});

