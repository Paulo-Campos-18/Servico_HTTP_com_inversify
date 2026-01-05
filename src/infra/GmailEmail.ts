import nodemailer from 'nodemailer';
import { ILogger } from '../domain/ILogger';
import { IMailer } from '../domain/IMailer'
import { TYPES } from '../types';
import { inject, injectable } from 'inversify';

let transporter: nodemailer.Transporter | null = null;

@injectable()
export class GmailMailProvider implements IMailer {


    constructor(@inject(TYPES.Logger) private logger: ILogger) { }

    async getMailClient() {
        if (transporter) return transporter;

        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        return transporter;
    }

    async send(to: string, subject: string, body: string) {
        const mailer = await this.getMailClient();
        await mailer.sendMail({ to: to, subject: subject, html: body })

        this.logger.info(`Email enviado para ${to} com sucesso`);

    }
}