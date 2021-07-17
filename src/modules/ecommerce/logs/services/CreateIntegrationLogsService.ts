import { injectable, inject } from 'tsyringe';

import IntegrationLogs from '../infra/typeorm/entities/IntegrationLogs';
import IIntegrationLogsRepository from '../repositories/IIntegrationLogsRepository';

interface IRequest {
  payload_request: string;
  response: string;
  method: string;
}

@injectable()
export default class CreateIntegrationLogsService {
  constructor(
    @inject('IntegrationLogsRepository')
    private integrationLogsRepository: IIntegrationLogsRepository,
  ) {}

  public async execute({
    payload_request,
    response,
    method,
  }: IRequest): Promise<IntegrationLogs> {
    const integratioLogs = await this.integrationLogsRepository.create({
      payload_request,
      response,
      method,
    });

    return integratioLogs;
  }
}
