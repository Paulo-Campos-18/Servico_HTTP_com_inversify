import { expect, it, vi } from 'vitest';
import { ReportService } from './ReportService'
import { InvalidReportSizeError } from '../errors/EmailErrors';

it("deve lançar erro quando n fora do range ", () => {
    //AAA -> Arrange, Act , Assert
    //Arrange criar coisas que eu preciso
    const loggerMock = {
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    }
    const mailerMock = {
        send: vi.fn()
    }

    //Act faço o teste
    const service = new ReportService(loggerMock, mailerMock)

    //Assert vejo se os resultados batem com o esperado
    expect(() => {
        service.genereateAndSend("Teste@gmail", -5)
    }).toThrow(InvalidReportSizeError)


})

it("deve chamar meiler.send para enviar email", () => {
    const loggerMock = {
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    }
    const mailerMock = {
        send: vi.fn()
    }

    const service = new ReportService(loggerMock, mailerMock)
    service.genereateAndSend("Teste@gmail",5)
    expect(mailerMock.send).toHaveBeenCalled()

})