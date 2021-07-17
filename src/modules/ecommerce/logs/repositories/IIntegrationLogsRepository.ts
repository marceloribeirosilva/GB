import IntegrationLogs from '../infra/typeorm/entities/IntegrationLogs';
import ICreateIntegrationLogsDTO from '../dtos/ICreateIntegrationLogsDTO';

export default interface IIntegrationLogsRepository {
  create(data: ICreateIntegrationLogsDTO): Promise<IntegrationLogs>;
  save(integrationLogs: IntegrationLogs): Promise<IntegrationLogs>;
  delete(integrationLogs: IntegrationLogs): Promise<void>;
}
