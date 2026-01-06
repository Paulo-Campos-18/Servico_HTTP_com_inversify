import { Container } from "inversify";
import { TYPES } from "../types";

import { EtheralMailProvider } from '../infra/Mail/EtheralEmail'
import { GmailMailProvider } from '../infra/Mail/GmailEmail'
import { WinstonConsoleLogger } from '../infra/Logger/WinstonConsoleLogger'
import { WinstonFileLogger } from '../infra/Logger/WinstonFileLogger'

import { ILogger } from "../domain/ILogger";
import { IMailer } from "../domain/IMailer";
import { InvalidEnvType } from "../errors/ContainerErrors";
import { IReportService } from "../domain/IReportService";

import { ReportService } from "../services/ReportService";
import { RelatorioController } from "../controllers/relatoryController";

const container = new Container();

if (process.env.APP_ENV === "dev") {
    container.bind<ILogger>(TYPES.Logger).to(WinstonConsoleLogger).inSingletonScope()
    container.bind<IMailer>(TYPES.Mailer).to(EtheralMailProvider).inSingletonScope()
} else if (process.env.APP_ENV === "prod") {
    container.bind<ILogger>(TYPES.Logger).to(WinstonFileLogger).inSingletonScope()
    container.bind<IMailer>(TYPES.Mailer).to(GmailMailProvider).inSingletonScope()
}else{
    throw new InvalidEnvType("Tipo de env (ambiente) não encontrado")
}

container.bind<IReportService>(TYPES.ReportService).to(ReportService)
container.bind<RelatorioController>(TYPES.RelatoryController).to(RelatorioController)

export{container}