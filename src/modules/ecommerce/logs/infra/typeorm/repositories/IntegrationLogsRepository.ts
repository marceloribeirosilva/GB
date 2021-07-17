import { getRepository, Repository } from 'typeorm';

import IIntegrationLogsRepository from '@modules/ecommerce/logs/repositories/IIntegrationLogsRepository';
import ICreateIntegrationLogsDTO from '@modules/ecommerce/logs/dtos/ICreateIntegrationLogsDTO';
import IntegrationLogs from '../entities/IntegrationLogs';

class IntegrationLogsRepository implements IIntegrationLogsRepository {
  private ormRepository: Repository<IntegrationLogs>;

  constructor() {
    this.ormRepository = getRepository(IntegrationLogs);
  }

  public async create(
    data: ICreateIntegrationLogsDTO,
  ): Promise<IntegrationLogs> {
    const logs = this.ormRepository.create(data);

    await this.ormRepository.save(logs);

    return logs;
  }

  public async save(
    integrationLogs: IntegrationLogs,
  ): Promise<IntegrationLogs> {
    const savedIntegrationsLogs = await this.ormRepository.save(
      integrationLogs,
    );

    return savedIntegrationsLogs;
  }

  public async delete(integrationLogs: IntegrationLogs): Promise<void> {
    await this.ormRepository.delete(integrationLogs);
  }
}

export default IntegrationLogsRepository;
