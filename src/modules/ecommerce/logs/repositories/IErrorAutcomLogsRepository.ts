import ErrorAutcomLogs from '../infra/typeorm/entities/ErrorAutcomLogs';
import ICreateErrorAutcomLogsDTO from '../dtos/ICreateErrorAutcomLogsDTO';

export default interface IErrorAutcomLogsRepository {
  create(data: ICreateErrorAutcomLogsDTO): Promise<ErrorAutcomLogs>;
  save(errorAutcomLog: ErrorAutcomLogs): Promise<ErrorAutcomLogs>;
  delete(errorAutcomLog: ErrorAutcomLogs): Promise<void>;
}
