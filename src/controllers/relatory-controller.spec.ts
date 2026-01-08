import {it,expect,vi} from "vitest"
import { RelatorioController } from "./relatoryController"
import { InvalidReportSizeError } from "../errors/EmailErrors"
import { InvalidEnvType } from "../errors/ContainerErrors"

it("deve retornar 400 bad request, quando serviço lançar InvalidReportSizeError ",() =>{
    const ReportServiceMock = {
        genereateAndSend: vi.fn( ).mockImplementation(() =>{
            throw new InvalidReportSizeError("")
        })
    }
    const loggerMock ={
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    }

    const controller  = new RelatorioController(loggerMock,ReportServiceMock)

    let reqMock  = {
        params: {},
        query: {email:""}
    } as any;
    let respoMock  = {
        status : vi.fn().mockReturnThis(),
        json:vi.fn()
    } as any;

   
    controller.relatoryProcess(reqMock,respoMock)

    expect(respoMock.status).toHaveBeenCalledWith(400)
})

it("deve retornar 500 Internal Server Error, quando serviço lançar erro genérico ",() =>{
    const ReportServiceMock = {
        genereateAndSend: vi.fn( ).mockImplementation(() =>{
            throw new InvalidEnvType("")
        })
    }
    const loggerMock ={
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    }

    const controller  = new RelatorioController(loggerMock,ReportServiceMock)

    let reqMock  = {
        params: {},
        query: {email:""}
    } as any;
    let respoMock  = {
        status : vi.fn().mockReturnThis(),
        json:vi.fn()
    } as any;

   
    controller.relatoryProcess(reqMock,respoMock)

    expect(respoMock.status).toHaveBeenCalledWith(500)
})