import { injectable, inject } from 'tsyringe';

import ErrorProductLogs from '../infra/typeorm/entities/ErrorProductLogs';
import IErrorProductLogsRepository from '../repositories/IErrorProductLogsRepository';

interface IRequest {
  id_anyshop: string;
  id_autcom: string;
  message: string;
  method: string;
}

@injectable()
export default class CreateErrorProductLogsService {
  constructor(
    @inject('ErrorProductLogsRepository')
    private errorProductLogsRepository: IErrorProductLogsRepository,
  ) {}

  public async execute({
    id_anyshop,
    id_autcom,
    message,
    method,
  }: IRequest): Promise<ErrorProductLogs> {
    const errorLogs = await this.errorProductLogsRepository.create({
      id_anyshop,
      id_autcom,
      message,
      method,
    });

    return errorLogs;
  }
}
