import winston from "winston";
import { ILogger } from "../domain/ILogger";
import { injectable } from "inversify";

@injectable()
export class WinstonConsoleLogger implements ILogger {
    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: "info",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
                winston.format.colorize()
            ),
            transports: [
                new winston.transports.Console(),
            ],
        });
    }

    warn(mgs: string): void {
       this.logger.warn(mgs);
    }

    info(mgs: string): void {
        this.logger.info(mgs);
    }

    error(mgs: string): void {
        this.logger.error(mgs);
    }
}