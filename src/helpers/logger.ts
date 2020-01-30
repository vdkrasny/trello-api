import { Logger as WinstonLogger, createLogger, format, transports } from 'winston';

import config from '../config';

export class Logger {
    private _env: string;

    private _loggerLevel: string;

    private _logger: WinstonLogger;

    private _transports: transports.StreamTransportInstance;

    constructor(public env?: string, public loggerLevel?: string) {
        this._env = env || config.nodeEnv;
        this._loggerLevel = loggerLevel || config.loggerLevel;

        if (this._env === config.nodeEnvTypes.development) {
            this._transports = new transports.Console({
                format: format.combine(format.cli(), format.splat()),
            });
        } else {
            this._transports = new transports.File({
                filename: 'process.log',
                format: format.json(),
            });
        }

        this._logger = createLogger({
            level: this._loggerLevel,
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-DD-MM HH:mm:ss',
                }),
                format.errors({ stack: true }),
                format.splat(),
                format.json()
            ),
            transports: this._transports,
        });
    }

    get logger(): WinstonLogger {
        return this._logger;
    }
}

export default new Logger().logger;
