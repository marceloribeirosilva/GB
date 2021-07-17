import ErrorProductLogs from '../infra/typeorm/entities/ErrorProductLogs';
import ICreateErrorProductLogsDTO from '../dtos/ICreateErrorProductLogsDTO';

export default interface IErrorProductLogsRepository {
  create(data: ICreateErrorProductLogsDTO): Promise<ErrorProductLogs>;
  save(errorProductLog: ErrorProductLogs): Promise<ErrorProductLogs>;
  delete(errorProductLog: ErrorProductLogs): Promise<void>;
}
