import { getRepository, Repository } from 'typeorm';

import IErrorProductLogsRepository from '@modules/ecommerce/logs/repositories/IErrorProductLogsRepository';
import ICreateErrorProductLogsDTO from '@modules/ecommerce/logs/dtos/ICreateErrorProductLogsDTO';
import ErrorProductLogs from '../entities/ErrorProductLogs';

class ErrorProductLogsRepository implements IErrorProductLogsRepository {
  private ormRepository: Repository<ErrorProductLogs>;

  constructor() {
    this.ormRepository = getRepository(ErrorProductLogs);
  }

  public async create(
    data: ICreateErrorProductLogsDTO,
  ): Promise<ErrorProductLogs> {
    const logs = this.ormRepository.create(data);

    await this.ormRepository.save(logs);

    return logs;
  }

  public async save(data: ErrorProductLogs): Promise<ErrorProductLogs> {
    const savedIntegrationsLogs = await this.ormRepository.save(data);

    return savedIntegrationsLogs;
  }

  public async delete(data: ErrorProductLogs): Promise<void> {
    await this.ormRepository.delete(data);
  }
}

export default ErrorProductLogsRepository;
