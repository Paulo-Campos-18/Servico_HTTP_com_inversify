import { Container } from "inversify";
import { TYPES } from "../types";

import { EtheralMailProvider } from '../infra/EtheralEmail'
import { GmailMailProvider } from '../infra/GmailEMail'
import { WinstonConsoleLogger } from '../infra/WinstonConsoleLogger'
import { WinstonFileLogger } from '../infra/WinstonFileLogger'

import { ILogger } from "../domain/ILogger";
import { IMailer } from "../domain/IMailer";

const container = new Container();

if (process.env.APP_ENV === "dev") {
    container.bind<ILogger>(TYPES.Logger).to(WinstonConsoleLogger).inSingletonScope
    container.bind<IMailer>(TYPES.Mailer).to(EtheralMailProvider).inSingletonScope
} else {
    container.bind<ILogger>(TYPES.Logger).to(WinstonFileLogger).inSingletonScope
    container.bind<IMailer>(TYPES.Mailer).to(GmailMailProvider).inSingletonScope
}

export{container}