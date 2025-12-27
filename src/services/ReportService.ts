import { IReportService } from "../domain/IReportService";
import { InvalidReportSizeError } from "../errors/EmailErrors";
import { IRegisterFormat } from '../domain/IRegisterFormat'
import { fakerPT_BR as faker } from "@faker-js/faker"
import { ILogger } from '../domain/ILogger';
import { TYPES } from '../types';
import { inject, injectable } from 'inversify';
import { IMailer } from "../domain/IMailer";

@injectable()
export class ReportService implements IReportService {


    constructor(@inject(TYPES.Logger) private logger: ILogger,
        @inject(TYPES.Mailer) private mailer: IMailer) { }

    genereateAndSend(email: string, n: number): void {
        if (n > 10 || n < 1) throw new InvalidReportSizeError("Erro: Só é permitido pedir de 1 a 10 registros ");

        let registros: IRegisterFormat[] = []

        for (let i = 0; i < n; i++) {
            registros.push({ nome: faker.person.fullName(), cidade: faker.location.city() } as IRegisterFormat)
        }

        this.logger.info("Iniciando envio de email")

        const bodyHtml = `
            <h1> Relatório solicitado de ${n} registros</h1>
            <p>Nome Pessoa - Cidade</p>
            <ul>
                ${registros.map(r => `<li>${r.nome} - ${r.cidade}</li>`).join('')}
             </ul>
            `

        this.mailer.send(email, "Relatório solicitado", bodyHtml)

    }

}