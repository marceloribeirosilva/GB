import { injectable, inject } from 'tsyringe';

import ErrorAutcomLogs from '../infra/typeorm/entities/ErrorAutcomLogs';
import IErrorAutcomLogsRepository from '../repositories/IErrorAutcomLogsRepository';

interface IRequest {
  id_anyshop: string;
  message: string;
  method: string;
}

@injectable()
export default class CreateErrorAutcomLogsService {
  constructor(
    @inject('ErrorAutcomLogsRepository')
    private errorAutcomLogsRepository: IErrorAutcomLogsRepository,
  ) {}

  public async execute({
    id_anyshop,
    message,
    method,
  }: IRequest): Promise<ErrorAutcomLogs> {
    const errorLogs = await this.errorAutcomLogsRepository.create({
      id_anyshop,
      message,
      method,
    });

    return errorLogs;
  }
}
