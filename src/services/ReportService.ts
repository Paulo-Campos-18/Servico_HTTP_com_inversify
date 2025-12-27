import { reportService } from "../domain/IReportService";
import { InvalidReportSizeError } from "../errors/EmailErrors";
import {registerFormat} from '../domain/IRegisterFormat'
import {fakerPT_BR as faker} from "@faker-js/faker"

export class ReportService implements reportService{
    private email:string;
    private n:number;

    constructor(email:string,n:number){
        this.email=email;
        this.n = n;
    }
    
    genereateAndSend(email: string, n: number): void {
        if(n > 10 || n <= 10)throw new InvalidReportSizeError("Erro: Só é permitido pedir de 1 a 10 registros ");

        let registros : registerFormat[]=[]
        
        for (let i = 0; i < n; i++) {
            registros.push({nome:faker.person.fullName(),cidade:faker.location.city()} as registerFormat)
            
        }
    }
    
}