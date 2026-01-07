import {it,expect,vi} from "vitest"
import { RelatorioController } from "./relatoryController"
import { InvalidReportSizeError } from "../errors/EmailErrors"

it("deve retornar 400 bad request, quando serviço lançar InvalidReportSizeError ",() =>{
    const ReportServiceMock = {
        genereateAndSend: vi.fn( ).mockImplementation(() =>{
            throw new InvalidReportSizeError("Erro: Só é permitido pedir de 1 a 10 registros")
        })
    }
    const loggerMock ={
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    }

    const controller  = new RelatorioController(loggerMock,ReportServiceMock)

    let reqMock  = {
        params: { n: "5" },
        query: {}
    } as any;
    let respoMock  = {
        status : vi.fn().mockReturnThis(),
        json:vi.fn()
    } as any;

   
    controller.relatoryProcess(reqMock,respoMock)

    expect(respoMock.status).toHaveBeenCalledWith(400)
})