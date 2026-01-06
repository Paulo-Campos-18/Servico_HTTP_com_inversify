import { Request, Response } from 'express';
import { TYPES } from '../types';
import { inject, injectable } from 'inversify';
import { ILogger } from '../domain/ILogger';
import { IReportService } from '../domain/IReportService';
import { IMailer } from '../domain/IMailer';
import { InvalidReportSizeError, UndefinedEmail } from '../errors/EmailErrors';
import { InvalidEnvType } from '../errors/ContainerErrors';

export class Relatorio {

    constructor(
        @inject(TYPES.Logger) private logger: ILogger,
        @inject(TYPES.ReportService) private service: IReportService,
        @inject(TYPES.Mailer) private mailer: IMailer
    ) { }

    public relatoryProcess(req: Request, res: Response) {
        
        try{
            const email = req.params.email;
            if(email == undefined)throw new UndefinedEmail("Error: Email vazio ou formato inválido")

            this.service.genereateAndSend(email,Number(req.params.n))

            return res.status(200).json({result: 'Relatório enviado com sucesso.'})
        }
        catch(error : any){
            if(error instanceof UndefinedEmail){
                return res.status(400).json({error: error.message})
            }
            if(error instanceof InvalidReportSizeError){
                return res.status(400).json({error: error.message})
            }
            if(error instanceof InvalidEnvType){
                return res.status(500).json({error: error.message})
            }

            this.logger.error(error.message)
            return res.status(500).json({error: error.message})
        }


    }
}