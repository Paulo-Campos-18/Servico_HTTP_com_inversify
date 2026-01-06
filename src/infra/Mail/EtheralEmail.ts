import nodemailer from 'nodemailer';
import { ILogger } from '../../domain/ILogger';
import { IMailer } from '../../domain/IMailer'
import { TYPES } from '../../types';
import { inject, injectable } from 'inversify';

let transporter: nodemailer.Transporter | null = null;

@injectable()
export class EtheralMailProvider implements IMailer {


    constructor(@inject(TYPES.Logger) private logger: ILogger) { }

    async getMailClient() {
        if (transporter) return transporter;
        // Cria uma conta de teste no Ethereal automaticamente
        const testAccount = await nodemailer.createTestAccount();

        transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
        return transporter;
    }

    async send(to: string, subject: string, body: string) {
        const mailer = await this.getMailClient();
        const info = await mailer.sendMail({ to: to, subject: subject, html: body })

        const url = nodemailer.getTestMessageUrl(info);

        if (url) {
            // use este link para visualizar no Ethereal
            this.logger.info(`Email enviado: ${url}`);
        } else {
            this.logger.warn("Email enviado mas url de pré-visualização indisponível");
        }
    }
}