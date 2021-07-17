import { getRepository, Repository } from 'typeorm';

import IErrorAutcomLogsRepository from '@modules/ecommerce/logs/repositories/IErrorAutcomLogsRepository';
import ICreateErrorAutcomLogsDTO from '@modules/ecommerce/logs/dtos/ICreateErrorAutcomLogsDTO';
import ErrorAutcomLogs from '../entities/ErrorAutcomLogs';

class ErrorAutcomLogsRepository implements IErrorAutcomLogsRepository {
  private ormRepository: Repository<ErrorAutcomLogs>;

  constructor() {
    this.ormRepository = getRepository(ErrorAutcomLogs);
  }

  public async create(
    data: ICreateErrorAutcomLogsDTO,
  ): Promise<ErrorAutcomLogs> {
    const logs = this.ormRepository.create(data);

    await this.ormRepository.save(logs);

    return logs;
  }

  public async save(data: ErrorAutcomLogs): Promise<ErrorAutcomLogs> {
    const savedIntegrationsLogs = await this.ormRepository.save(data);

    return savedIntegrationsLogs;
  }

  public async delete(data: ErrorAutcomLogs): Promise<void> {
    await this.ormRepository.delete(data);
  }
}

export default ErrorAutcomLogsRepository;
